import { Text, StyleSheet, View ,FlatList,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles';
import { useFocusEffect } from '@react-navigation/native';

  const HorarioSelector = ({onSelectHorario , selectedDate}) => {

    const Horario = ({id,hora})=>(

        
        <View >
        <TouchableOpacity 
        style={stilo.serviceItem}
              onPress={() => handleSelectService(id,hora)}
            >
            <View style={stilo.serv}>
            <Text style={stilo.text}>{hora} </Text>     
            </View>
          </TouchableOpacity>   
        </View>
    );
    const renderHoras = ({ item }) => {
      return(
        <Horario 
        hora={item.hora} 
        id={item.id} 
        />
      );
    };

    const handleSelectService = (id,hora) => {
      setSelecionado(hora);
      setShowServices(false); 
      onSelectHorario(id);
      
    };

    const [selecionado, setSelecionado] = useState('Escolha um horario');
    const [horario, setHorario] = useState([]);
    
    const [showServices, setShowServices] = useState(false);

    const obterListaHoras = async () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ data : selectedDate})
        };
        console.log(selectedDate)
        await fetch('http://10.0.2.2:5000/horarios',requestOptions)
                .then(response => response.json())
                .then(horas => setHorario(horas))
                .catch(error => console.error('Error fetching data:', error));
    };

    useFocusEffect(
      React.useCallback(() => {
        setShowServices(false)
        setSelecionado('Escolha um horario')
        obterListaHoras();
      },[selectedDate])
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
        {horario.length === 0 ? (
            <Text style={[stilo.text,{margin:20}]}>Não há horários disponíveis para esta data.</Text>
        ) : (
        <FlatList
            data={horario}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            renderHoras({item})
            )}
        />
        )}
    </View>
    )}
    </View>
</View>
);
};
  
  export default HorarioSelector;
  
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

    
  
  })
