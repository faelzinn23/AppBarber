import React, { useState,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, StyleSheet,TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const InputDate = ({onInputDate}) => {
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  const getDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  }

  const Data = ({data,dataF})=>{

    if(data >= getDate()){
      return(
        <View >
    <TouchableOpacity
        style={stilo.serviceItem}
            onPress={() => {
            setSelecionado(`${dataF[2]}/${dataF[1]}/${dataF[0]}`);
            setDate('${dataF[2]}/${dataF[1]}/${dataF[0]}')
            onInputDate(`${dataF[2]}/${dataF[1]}/${dataF[0]}`)
            }}
                >
            <View style={stilo.serv}>
            <Text style={stilo.text}>{`${dataF[2]}/${dataF[1]}/${dataF[0]}`}</Text>    
            </View>
            
        </TouchableOpacity>  
    </View>
      )

    }
    
  };



  const renderData = ({ item }) => {
    return(
      <Data
      data= {item.data} 
      dataF= {item.data.split('-')}
      />
  
    );
  };

  const [showServices, setShowServices] = useState(false);

  const [selecionado, setSelecionado] = useState('Escolha uma data');
  const [date, setDate] = useState(null);
 
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);

  const obterDatasDisponiveis = async () => {
    console.log(getDate())
    await fetch('http://10.0.2.2:5000/agendaBarb',)
            .then(response => response.json())
            .then(datas => setDatasDisponiveis(datas))
            .catch(error => console.error('Error fetching data:', error));
};


   
    useFocusEffect(
      React.useCallback(() => {
        setShowServices(false)
        obterDatasDisponiveis();
      },[selecionado])
    );

  return (
    <View style={stilo.container} >
        <View style={{width:'100%',}}>
       <TouchableOpacity  
       style={stilo.selectButton}
        onPress={() => setShowServices(!showServices)}
      >
        <View style={stilo.serv}>
        <Text style={stilo.buttonText}>{selecionado}</Text>
        <Text style={[stilo.buttonText,{}]}>↓</Text>
        </View>
      </TouchableOpacity>
      {showServices && (
        <View style={stilo.serviceList}>
        {datasDisponiveis.length === 0 ? (
            <Text style={[stilo.text,{margin:20}]}>Não há datas disponíveis .</Text>
        ) : (
        <FlatList
            data={datasDisponiveis}
            keyExtractor={(item) => item.data}
            renderItem={({ item }) => (

            renderData({item})
            )}
        />
        )}
    </View>
    )}
    </View>
</View>
  );
};

const stilo = StyleSheet.create({
  container: {
    marginVertical:20,
    backgroundColor:'#303030',
    width:'85%',
  },
 
  text:{
    color:'orange',
    fontSize:20,
  },
  serv:{
    flexDirection:"row",
    justifyContent:'space-between',
    
  },
  serviceList: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    maxHeight: 220, // Limita a altura da lista
    elevation: 2, // Sombra no Android
    

    
    
  },
  serviceItem: {
    padding: 10,
    marginVertical: 5,
    
    borderRadius: 5,
  },
  serviceText: {
    fontSize: 16,
  },
  buttonText: {
    
    color: 'white',
    fontSize: 20,
    padding:20,
    fontWeight:'bold'
  },
  selectButton: {
    
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    
    
  },

});

export default InputDate;