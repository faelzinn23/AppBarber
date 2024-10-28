import { Text, StyleSheet, View ,FlatList,TouchableOpacity,Modal,Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Styles';
import SelectService from './ServiceSelector';
import InputDate from './InputDate';
import HorarioSelector from './HorarioSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Agendar = ({navigation}) => {
    
    const [IdServico, setIdServico] = useState(null);
    const [IdHora, setIdahora] = useState(null);
    const [usuario, setUsuario] = useState({});
    
    const [date, setDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [condicao,setCondicao]=useState("informe seu login")
    const salvaIdServico = (id) => {
      setIdServico(id);
      
    };
    const limpaForm = () => {
      navigation.reset({
        routes:[{name: 'Agendar'}]
      })
      
    };


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
    const formataData = (dateString) => {
      const [dia, mes, ano] = dateString.split('/');
      return `${ano}-${mes}-${dia}`;
    };

    const salvaData=(data) =>{
      const dataFormatada=formataData(data)
      setDate(dataFormatada)
      
    }

    const salvaIdHora = (idhr) => {
      setIdahora(idhr);
      
      
    };

    useEffect(() => {
      obterDadosUsuario();
    }, []);
    const criaAgendamento = async () => {
      if (!IdServico  || !date  || !IdHora ){
        setCondicao("Preencha todos os campos")
        setModalVisible(true);
      } else {
        
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ idServico:IdServico, data:date , idHora: IdHora , idCliente:usuario.id})
        };
        //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
        await fetch('http://10.0.2.2:5000/criaAgendamento', requestOptions)
          .then(response => response.json())
          .then(data => conclui(data))
          .catch(error => console.error('Error fetching data:', error));
        }
          
      }

    const conclui= (msg)=>{
      if (msg.error) {
        setCondicao(msg.error);
      } else if(msg.status){
        setCondicao(msg.status);
  
      }
      setModalVisible(true);
      console.log(IdServico,date,IdHora,usuario.id)
      
    }


    return (
      <View style={stilo.container} >
        <Text style={stilo.titulo}>Realizar Agendamento</Text>
        <SelectService onSelectService={salvaIdServico}/>
        <InputDate onInputDate={salvaData}/>
        <HorarioSelector onSelectHorario={salvaIdHora} selectedDate={date}/>
        

        <View style={styles.botao} >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{condicao}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);limpaForm();}}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={criaAgendamento}>
        <Text style={styles.textStyle}>Agendar</Text>
      </Pressable>
      </View>

      </View>
    );
    
  };
  
  export default Agendar;
  
  const stilo = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#303031',
      
    },
    titulo:{
      fontSize:30,
      color:'lightyellow',
      marginBottom:50
    }

  

  
  })
