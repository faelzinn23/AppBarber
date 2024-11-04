import { Text, View, Pressable,Image, FlatList, TouchableOpacity, Modal, Button, StyleSheet,TextInput} from 'react-native';
import {useState,useEffect} from 'react';
import styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Profile = ({navigation}) => {

    
      const [usuario, setUsuario] = useState({});
      const [modalVisible, setModalVisible] = useState(false);
      const [date,setDate] = useState(null)
      const [dataFormatada,setDataFormatada] = useState(null)
      useEffect(() => {
          obterDadosUsuario();
      }, []);
  
      //Aqui estamos recuperando os dados usando o AsyncStorage
      const obterDadosUsuario = async () => {
          try {
              const jsonValue = await AsyncStorage.getItem('usuario');
              const usuarioLogado = jsonValue != null ? JSON.parse(jsonValue) : null;
              setUsuario(usuarioLogado[0]);
          } catch (e) {
              // error reading value
              console.log(e);
          }
      };

      const sair = async () => {
      try {
          await AsyncStorage.clear();
      } catch (e) {
          console.error(e);
      }
      console.log('Done.')

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
    const handleEventdate = () => {
      if (!date || date.split('/').length <= 2 ){
        alert("Digite uma data valida")
      }else{
        console.log(date.split('/'))
        try{
          const [dia, mes, ano] = date.split('/');
          setDataFormatada(`${ano}-${mes}-${dia}`)
          console.log(date)
          geraHorarios()
        }catch (error){
          alert(error)
        }
      }
    };

    const geraHorarios = async () => {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ data :dataFormatada})
      };
      
      await fetch('http://10.0.2.2:5000/gerarHorario',requestOptions)
          .then(response => response.json())
          .then(msg => conclui(msg))
          .catch(error => console.error('Error fetching data:', error));
      };
      const conclui = (msg) => {
        if(msg.error){
          alert(msg.error)
        }else{
          alert(msg.status)
          setDate(null)
        }
      }
 
    return (
      <View style={stilo.container}>
        <View style={stilo.info}>
        <Image style={stilo.imagem} source={uri= require("../../assets/perfil.png")}></Image>
          <Text style={stilo.text}>Nome: {usuario.name}</Text>
          <Text style={stilo.text}>Usuario: {usuario.usuario}</Text>
          <Text style={stilo.text}>Email: {usuario.email}</Text>
          <Text style={stilo.text}>Telefone: {usuario.telefone}</Text>
        </View>
        <View >
          <Pressable style={stilo.but}
            onPress={() => {setModalVisible(true)}}>
            <Text style={{color:'white', marginLeft:5}}>Disponibilizar Horarios</Text>
          </Pressable>
          </View>

          <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={stilo.modalContainer}>
              <View style={stilo.modalContent}>
                <View style={{alignItems:'center'}}>

                <Text style={stilo.modalTitle}>Disponibilizar horarios para uma data</Text>
                <TextInput
                style={stilo.entrada}
                placeholder='digite uma data: (DD/MM/AAA)'
                placeholderTextColor="black"
                value={date}
                onChangeText={setDate}/>
                </View>
                
                <Pressable style={stilo.btnDisp}
                  onPress={() => {handleEventdate()}}>
                  <Text >Gerar Horarios</Text>
                </Pressable>
                <Pressable style={stilo.btnClose}
                  onPress={() => {setModalVisible(false)}}>
                  <Text >Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          </View>
          
        
        <View >
          <Pressable style={stilo.butao}
            onPress={sair}>
            <Text >Sair</Text>
          </Pressable>
        </View>

      </View>
    );
  };
  
export default Profile;
  
  const stilo = StyleSheet.create({
    
      container: {
        flex: 1,
        justifyContent: 'center',
        
        backgroundColor:'#303030',
        width:'100%',
      },
    
  
    butao:{
     
      backgroundColor:'orange',
      paddingHorizontal:'25%',
      paddingVertical:15,
      elevation:20,
      borderRadius:20,
      justifyContent: 'flex-end',
      marginBottom:20,
      alignItems:'center',
      marginHorizontal:'20%',
    },
    info:{
      padding:50,
      textDecorationColor:'white',
      flex:1,
      alignItems:'center',
      Color:'white',
      
    },

    imagem:{
      
      backgroundColor:'white',
      borderRadius:200,
    },
    text:{
      color:'white',
      fontSize:20,
    },
    but:{
      backgroundColor:'#373737',
      width:'100%',
      paddingVertical:15,
      elevation:20,
      marginTop:'-35%',
      marginBottom:20,
    },
    text: {
      color: 'white',
      fontSize: 20,
      fontWeight:'bold',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    selectButton: {
      backgroundColor: '#1e90ff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    horarioItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    btnClose:{
      borderRadius:25,
      backgroundColor:'red',
      paddingVertical:15,
      elevation:10,
      justifyContent: 'flex-end',
      alignItems:'center',
      marginHorizontal:'20%',
    },
    btnDisp:{
      borderRadius:25,
      marginBottom:15,
      paddingVertical:15,
      elevation:10,
      justifyContent: 'flex-end',
      alignItems:'center',
      marginHorizontal:'20%',
      backgroundColor:'#a1a1ff',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    entrada:{
      borderWidth:1,
      borderBlockColor:'black',
      padding:20,
      marginBottom:10
    },
    modalContent: {
      width: '84%',
      padding: 20,
      backgroundColor: '#ddd',
      borderRadius: 10,
      maxHeight:450,
      justifyContent:'center',
      
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  
    },
    modalText: {
      fontSize: 16,
    },

    
  
  })
