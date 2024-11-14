import { Text, StyleSheet, View , Pressable,ScrollView, Image,ActivityIndicator} from 'react-native';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
const Home_cli = ({navigation}) => {

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
      obterDadosUsuario();
  }, []);
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

const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    React.useCallback(() => {
      const fetchProximoAgendamento = async () => {
        try {
          const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ idCliente:usuario.id})
          };
          const response = await fetch('http://10.0.2.2:5000/itemHome',requestOptions);
          const data = await response.json();
          setAgendamento(data);
        } catch (error) {
          console.error("Erro ao buscar o próximo agendamento:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProximoAgendamento();
    },[usuario.id])
  );

  



  const RenderizaAgendamento = ()=>{
    console.log(agendamento)
    if (loading) {
      return <ActivityIndicator size="large" color="lightyellow" />;
    }
  
    if (agendamento.message) {
      return <Text style={{margin:20,fontSize:20,color: 'white'}}>Nenhum agendamento futuro encontrado.</Text>;
    }else{
      const [ano,mes,dia] = agendamento.data.split('-');
      return(
        <View style={{margin:20, }}>
          <Text style={styles.t}>Data: {dia}/{mes}/{ano}</Text>
          <Text style={styles.t}>Hora: {agendamento.hora}</Text>
          <Text style={styles.t}>Serviço: {agendamento.nome_servico}</Text>
        </View>
      )
    }
  }




  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.imagem} source={uri= require("../../../assets/logo.png")}></Image>
        <Text style={styles.titulo}> Bem Vindo, {usuario.name} </Text>
      </View>



      <ScrollView>


      <View style={styles.content}>

          <Text style={styles.text}>Proximo agendamento </Text>
        <View style={styles.agenda}>
        <RenderizaAgendamento/>
        

        </View>

          <Text style={styles.text}>Realizar agendamento </Text>
        <View style={styles.agendamento}>
          <Pressable style={styles.butao}
            onPress={()=> navigation.navigate('Agendar')}>
            <Text >Agendar um Seriço</Text>
          </Pressable>
        </View>

          <Text style={styles.text}>Produtos e Servicos:</Text>
        <View style={styles.servicos}>
          <Pressable style={styles.butao}
            onPress={()=> navigation.navigate('Produtos')}>
            <Text >Vizualizar Produtos e Serviços</Text>
          </Pressable>
        </View>

          <Text style={styles.text}>Historico:</Text>
        <View style={styles.historico}>
          <Pressable style={styles.butao}
            onPress={()=> navigation.navigate('Agendamentos')}>
            <Text >Historico de Agendamentos</Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>

      

    </View>
  );
};

export default Home_cli;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#303030',
      
    },
    header: {
      
      backgroundColor:'#505050',
      width:'100%',
      alignItems: 'center',
      height:'17%'
    },

    titulo:{
      flex:1,
      color:'lightyellow',
      fontSize:25,
      textAlignVertical:'bottom',
      

    },
    content:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      margin:10,
      
    },
    text:{
      fontSize:25,
      color:'lightyellow',
      fontWeight:'bold',
      marginVertical:25,
      textAlign:'left',
      width:'100%'
      
    },
    butao:{
      backgroundColor:'orange',
      paddingVertical:15,
      elevation:20,
      borderRadius:20,
      alignItems:'center',
      width:'80%', 
      marginBottom:25,
      marginTop:50,
    },

    agendamento:{
      alignItems:'center',
      borderWidth:1,
      width:'90%',
      borderRadius:15,
      

    },
    agenda:{
      
      
      width:'90%',
      borderRadius:15,
      backgroundColor:'#404040',
      borderWidth:1,
      borderColor:'orange',
      elevation:4,
      
      

    },
    t:{
      marginLeft:5,
      fontSize:20,
      color:'white'
    },
    servicos:{
      alignItems:'center',
      borderWidth:1,
      width:'90%',
      borderRadius:15,
    },
    historico:{
      alignItems:'center',
      borderWidth:1,
      width:'90%',
      borderRadius:15,
    },
    imagem:{
      marginTop:10,
      height: 90,
      width: 90,
      justifyContent:'center',
      borderRadius:35,
      
  
    },



})