import { Text, StyleSheet, View ,FlatList,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles';
import { useFocusEffect } from '@react-navigation/native';

  const SelectService = ({onSelectService}) => {

    const Servico = ({id,nome,preco,imagem,descricao,duracao})=>(

        <View >
        <TouchableOpacity 
        style={stilo.serviceItem}
              onPress={() => handleSelectService(id,nome)}
            >
            <View style={stilo.serv}>
            <Text style={stilo.text}>{nome[0].toUpperCase() + nome.substring(1)}   </Text>
            <Text style={stilo.text}>R${(preco.toFixed(2))}</Text>
            </View>
           

          </TouchableOpacity>
          
        </View>
      
    );
    const renderServico = ({ item }) => {
      return(
        <Servico 
        descricao={item.descricao} 
        duracao={item.duracao}  
        id={item.id} 
        imagem ={item.imagem} 
        nome={item.nome} 
        preco={item.preco} 
        />
      );
    };

    const handleSelectService = (id,service) => {
      setSelecionado(service);
      setShowServices(false); // Opcional: Fechar a lista após a seleção
      onSelectService(id);
      
    };

    const [selecionado, setSelecionado] = useState('selecione um servico:');
    const [servicos, setServicos] = useState([]);
    const [IdServico, setIdServico] = useState(null);
    const [showServices, setShowServices] = useState(false);

    const obterListaServicos = async () => {
      await fetch('http://10.0.2.2:5000/servicos')
                .then(response => response.json())
                .then(services => setServicos(services))
                .catch(error => console.error('Error fetching data:', error));
    };

    useFocusEffect(
      React.useCallback(() => {
        setShowServices(false)
        setSelecionado('Selecione um servico:')
        obterListaServicos();
      },[IdServico])
    );
    
   
    return (
      <View style={stilo.container} >
        <View style={{width:'100%',}}>
       <TouchableOpacity  
       style={stilo.selectButton}
        onPress={() => setShowServices(!showServices)}
      >
        <View style={stilo.serv}>
        <Text style={stilo.buttonText}>{selecionado[0].toUpperCase() + selecionado.substring(1)}</Text>
        <Text style={[stilo.buttonText,{}]}>↓</Text>
        </View>
      </TouchableOpacity>
      {showServices && (
        <View style={stilo.serviceList}>
          
        <FlatList
  
       data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          renderServico({item})
        )}
      />
        </View>
        
      )}
      </View>
      </View>
    );
  };
  
  export default SelectService;
  
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
      maxHeight: 220, 
      elevation: 2, 
      
  
      
      
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
