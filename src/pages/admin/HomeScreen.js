import { Text, StyleSheet, View , Pressable,ScrollView, Image,ActivityIndicator} from 'react-native';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
const HomeScreen = ({navigation}) => {

  

const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    React.useCallback(() => {
      const fetchProximoAgendamento = async () => {
        try {
          
          const response = await fetch('http://10.0.2.2:5000/itemHome');
          const data = await response.json();
          setAgendamento(data);
        } catch (error) {
          console.error("Erro ao buscar o próximo agendamento:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProximoAgendamento();
    },[])
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
          <Text style={styles.t}>Cliente: {agendamento.nome_cliente}</Text>
        </View>
      )
    }
  }




  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.imagem} source={uri= require("../../../assets/logo.png")}></Image>
        <Text style={styles.titulo}> BARBEARIA GOMES </Text>
      </View>



      <ScrollView>


      <View style={styles.content}>

          <Text style={styles.text}>Proximo agendamento </Text>
        <View style={styles.contAgend}>
        <View style={styles.agenda}>
        <RenderizaAgendamento/>
        </View>
        <Pressable style={styles.butao}
            onPress={()=> navigation.navigate('Agendamentos')}>
            <Text style={{fontWeight:'bold'}}>Ver Agenda Completa</Text>
          </Pressable>
        </View>

          

          <Text style={styles.text}>Produtos e Servicos:</Text>
        <View style={styles.servicos}>
          <Pressable style={styles.butao}
            onPress={()=> navigation.navigate('Produtos')}>
            <Text style={{fontWeight:'bold'}}>Vizualizar Produtos e Serviços</Text>
          </Pressable>
        </View>

          
      </View>
      </ScrollView>

      

    </View>
  );
};

export default HomeScreen;
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
      
      
      width:'85%',
      borderRadius:15,
      backgroundColor:'#404040',
      borderWidth:1,
      borderColor:'orange',
      elevation:4,
      marginTop:15,
      
      

    },
    contAgend:{
      
      
      
      alignItems:'center',
      borderWidth:1,
      width:'90%',
      borderRadius:15,
      
      

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