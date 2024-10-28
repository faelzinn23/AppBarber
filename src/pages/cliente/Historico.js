
import { Text, StyleSheet, View, FlatList, ScrollView,SectionList, Image, Pressable,Alert } from 'react-native';
import { useState,useEffect } from 'react';
import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Historico = () => {



  
  const [usuario, setUsuario] = useState({});
  const [agendamentos, setAgendamentos] = useState([]);
  
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
 
  
  const Agendamento = ({id,clientNome,servicoNome,idHorario,data,hora,status})=>(
    
        <View style={{backgroundColor:'white',}}>
          <Text>{id}</Text>
          <Text>{clientNome}</Text>
          <Text> {servicoNome} </Text>
          <Text> {idHorario}</Text>
          <Text> {data}</Text>
          <Text>{hora}</Text>
          <Text>{status}</Text>
        </View>

    
  );
  
  
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
      />
  
    );
  };
  

  const obterListaAgendamentos = async () => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ idCliente:usuario.id})
    };
    await fetch('http://10.0.2.2:5000/agendaCli',requestOptions)
        .then(response => response.json())
        .then(products => setAgendamentos(products))
        .catch(error => console.error('Error fetching data:', error));
    };

    
    
    useEffect(() => {
      obterDadosUsuario();
      obterListaAgendamentos();
      
    }, []);

    return (
      <View style={styles.container}>
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            renderAgendamento({item})
          )}
        />
        
      </View>
    );
  };
  
  export default Historico;
  