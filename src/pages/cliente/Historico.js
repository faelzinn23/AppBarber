
import { Text, StyleSheet, View, FlatList, ScrollView,SectionList, Image, Pressable,Alert ,} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Historico = ({navigation}) => {
    


  
  const [usuario, setUsuario] = useState({});
  const [agendamentos, setAgendamentos] = useState([]);
  const CliId = usuario.id
  const [refresh,setRefresh] = useState(0)
  
  

  const recarregarPagina = () => {
    setRefresh(refresh + 1); 
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
 
  
  const Agendamento = ({id,clientNome,servicoNome,idHorario,data,hora,status,dataF})=>{
    if (status == "agendado"){
      return(
          <View style={stilo.agendamento}>
            <View>
              <Text style={{fontSize:25 }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
              <Text style={{fontWeight:'bold'}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
              <Text style={{fontWeight:'bold'}}>Hora:{hora}</Text>
              <Text style={{}}>id:{id}</Text>
            </View>
            
            <View style={{flexDirection:'column', justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold' , backgroundColor:'lightblue', padding:7,borderRadius:4}}>{status[0].toUpperCase() + status.substring(1)}</Text>
              <Pressable
              style={{backgroundColor:'red', borderRadius:5, padding:7,}}
                onPress={() => cancela(id,data,hora)}>
                <Text style={{fontWeight:'bold' ,textAlign:'center' , marginTop:'auto'}} >Cancelar</Text>
                </Pressable>
              
            </View>
          </View>
      )
    }else if(status == "cancelado"){
      return(
        <View style={stilo.agendamento}>
          <View>
            <Text style={{fontSize:25 }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
            <Text style={{fontWeight:'bold'}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
            <Text style={{fontWeight:'bold'}}>Hora:{hora}</Text>
          </View>
          
          <View>
            <Text style={{fontWeight:'bold' , backgroundColor:'#f17d4b', padding:5,borderRadius:5}}>{status[0].toUpperCase() + status.substring(1)}</Text>
        
            <Text style={{textAlign:'right' ,  marginTop:'auto',}}>id:{id}</Text>
          </View>
        </View>
    )
    }else if(status == "concluido"){
      return(
        <View style={stilo.agendamento}>
          <View>
            <Text style={{fontSize:25 }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
            <Text style={{fontWeight:'bold'}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
            <Text style={{fontWeight:'bold'}}>Hora:{hora}</Text>
          </View>
          
          <View>
            <Text style={{fontWeight:'bold' , backgroundColor:'#0fa816', padding:5,borderRadius:5}}>{status[0].toUpperCase() + status.substring(1)}</Text>
        
            <Text style={{textAlign:'right' ,  marginTop:'auto',}}>id:{id}</Text>
          </View>
        </View>
      )
    }
    
  };
  
  
  const renderAgendamento = ({ item }) => {
    return(
      <Agendamento 
      id={item.id} 
      clientNome ={item.nome_cliente}   
      servicoNome ={item.nome_servico}   
      idHorario= {item.id_horario} 
      data= {item.data} 
      hora= {item.hora} 
      status={item.status}
      dataF= { item.data.split('-')}
      />
  
    );
  };
  const cancela = async (id,data,hora) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja cancelar esse agendamento',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {
          cancelaAgendamento(id,data,hora)
          
    
        }},
      ],
    { cancelable: false },
    );  
    
    
  }
  
  const cancelaAgendamento = async (id,data,hora) => {
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id:id, hora:hora,data:data})
    };
    
    await fetch('http://10.0.2.2:5000/agendaCli',requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
    };

    const conclui = (msg) => {
      if(msg.error){
        alert(msg.error)
      }else{
        alert(msg.status)
      }
      recarregarPagina();
    }

  const obterListaAgendamentos = async () => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ idCliente :usuario.id})
    };
    
    await fetch('http://10.0.2.2:5000/agendaCli',requestOptions)
        .then(response => response.json())
        .then(products => setAgendamentos(products))
        .catch(error => console.error('Error fetching data:', error));
    };

    useFocusEffect(
      React.useCallback(() => {
        obterDadosUsuario();  // Aguarda o ID do usuário
        obterListaAgendamentos();
      },[usuario.id,refresh])
    );

    return (
      <View style={stilo.container}>
        <View style={stilo.geral}>
        <Text style={stilo.titulo}>Meus Agendamentos:</Text>
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            renderAgendamento({item})
            
          )}
          ListEmptyComponent={() => (
            <View style={{justifyContent:'center',flex:1,paddingVertical:50,marginVertical:30,}}> 
              <View style={stilo.vasio}>
              <Text style={{fontSize:25,textAlign:'center',color:'white'}}>Não possui agendamentos</Text>
            </View>
            </View>
              
            
          )}
        />
        </View>
        
      </View>
    );
  };
  
  export default Historico;
  const stilo = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#303030',
      
      
    },
    agendamento: {
      
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white',
      padding: 10,
      marginVertical:15,
      borderRadius:5,
      elevation:10,
      width:'100%',
      height:100,
      
      
      
    },
    geral:{
      flexGrow:1,
      marginTop:'30%',
      width:'85%',
      marginBottom:'7%',
      


    },
    titulo:{
      fontSize:30,
      color:'lightyellow',
      marginBottom:25,
      
    },
    vasio:{
      
      borderRadius:15,
      backgroundColor:'#404040',
      borderWidth:1,
      borderColor:'orange',
      elevation:4,
      justifyContent:'center',
      height:120,
      
      
    },

})