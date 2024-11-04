import { Text, StyleSheet, View, FlatList} from 'react-native';
import React, { useState,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import InputDate from './InputDate';
  const Agendamentos = () => {

    const [agendamentos, setAgendamentos] = useState([]);

    const Agendamento = ({id,clientNome,servicoNome,idHorario,data,hora,status,dataF})=>{
        return(
            <View style={stilo.agendamento}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',}}>
                <View style={{ }}>
                <Text style={{fontSize:25,color:'white', }}>{clientNome[0].toUpperCase() + clientNome.substring(1)} </Text>
                <Text style={{fontWeight:'bold',color:'lightyellow',}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
                <Text style={{fontWeight:'bold',color:'lightyellow',}}>Hora:{hora}</Text>
                <Text style={{}}>id:{id}</Text>
                </View>
                <View style={{justifyContent:'space-between',alignItems:'flex-end',width:'50%'}}>
                <Text style={{fontSize:25,color:'white', }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
                <Text>{status}</Text>
                </View>
              </View>
              
              {/* <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                <Text style={{fontWeight:'bold' , backgroundColor:'lightblue', padding:7,borderRadius:4}}>{status[0].toUpperCase() + status.substring(1)}</Text>
                <Pressable
                style={{backgroundColor:'red', borderRadius:5, padding:7,}}
                  onPress={() => cancela(id)}>
                  <Text style={{fontWeight:'bold' ,textAlign:'center' , marginTop:'auto'}} >Cancelar</Text>
                  </Pressable>
                
              </View> */}
            </View>
        )
      
     
      
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

    const obterListaAgendamentos = async () => {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ data :date})
      };
      
      await fetch('http://10.0.2.2:5000/agendaBarb',requestOptions)
          .then(response => response.json())
          .then(products => setAgendamentos(products))
          .catch(error => console.error('Error fetching data:', error));
      };

      const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
        const year = date.getFullYear();
        
        return `${year}-${month}-${day}`;
      }
      const [date, setDate] = useState(getCurrentDate());
  
      useFocusEffect(
        React.useCallback(() => {
          obterListaAgendamentos();
        },[date])
      );

  

    
    const formataData = (dateString) => {
      const [dia, mes, ano] = dateString.split('/');
      return `${ano}-${mes}-${dia}`;
    };

    const salvaData=(data) =>{
      const dataFormatada=formataData(data)
      setDate(dataFormatada)
      
    }
    return (
      <View style={stilo.container}>
        <View style={stilo.item}>
        <View style={stilo.data}>  
        <InputDate onInputDate={salvaData}/>
        </View>
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            renderAgendamento({item})
          )}
          ListEmptyComponent={() => (
            <View style={stilo.vasio}>
              <Text style={{fontSize:25,textAlign:'center',color:'lightyellow',}}>Nao possui nenhum agendamento para esta data</Text>
            </View>
          )}
        />
        </View>
      </View>
    );
  };
  
  export default Agendamentos;

  const stilo = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'top',
      backgroundColor:'#303030',
      paddingHorizontal:'7%'
    },
    data: {
      alignItems: 'center',
    },
    agendamento: {
      
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#373737',
      padding: 10,
      marginVertical:15,
      borderRadius:5,
      elevation:10,
      width:'100%',
      height:100
      
      
    },
    vasio: {
      
      alignItems:' center',
      justifyContent:'center',
      backgroundColor:'#373737',
      
      marginTop:'40%',
      borderRadius:5,
      elevation:20,
      width:'100%',
      
      
      
    },
    item:{
      
      width:'100%'
      


    },
    titulo:{
      fontSize:30,
      color:'lightyellow',
      marginBottom:25,
      
    }

})