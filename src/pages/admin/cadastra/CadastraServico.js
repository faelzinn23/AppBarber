import { Text, StyleSheet,Image, View, TextInput,Button, Touchable, Pressable, Alert, Modal } from 'react-native';
import { useState } from 'react';
import styles from './Style.js';

import AsyncStorage from '@react-native-async-storage/async-storage';


const CadastraServico = ({navigation}) => {

  const [condicao,setCondicao]=useState(null)
  const [nome,setNome]= useState(null);
  const [descricao,setDescricao]= useState(null);
  const [preco,setPreco]= useState(null);
  const [imagem,setImagem]= useState(null);
  const [temp,setTemp]= useState(null);
  

  const mudarDescricao=(us)=>{
    setDescricao(us)
  }
  const mudarNome=(nm)=>{
    setNome(nm)

  }
  const mudarPreco=(nmr)=>{
    setPreco(nmr)

  }
  const mudarImagem=(sn1)=>{
    setImagem(sn1)

  }
  const mudarTemp=(sn)=>{
    setTemp(sn)
  }

  const cadastrar = async () => {
    if (!descricao  || !nome   || !preco  || !temp ){
      setCondicao("Preencha os campos obrigatorios")
      setModalVisible(true);
    } else{
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome:nome,descricao:descricao, preco : preco , duracao : temp, imagem : imagem})
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
    await fetch('http://10.0.2.2:5000/servicos', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
    }
    
        
  }

  const retorna = () =>{
    navigation.reset({
      routes:[{name: 'Produtos'}]
    })
    navigation.goBack()
  }
  
  function conclui(msg) {
  
    if (msg.error) {
      setCondicao(msg.error);
    } else if(msg.status){
      setCondicao(msg.status);
      console.log(msg.status);
    }
    setModalVisible(true);
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      
      <Text style={stilo.titulo}>Cadastrar Serviço</Text>
      <TextInput style={styles.text} 
      placeholder="Serviço: *" 
      placeholderTextColor="lightyellow" 
      value={nome}
      onChangeText={text=>mudarNome(text)} 
      />
      <TextInput style={styles.text} 
      placeholder="Descição: *" 
      placeholderTextColor="lightyellow" 
      value={descricao}
      onChangeText={text=>mudarDescricao(text)} 

      />
      <TextInput style={styles.text} 
      placeholder="Preço:  *" 
      placeholderTextColor="lightyellow" 
      value={preco}
      onChangeText={text=>mudarPreco(text)} 
      inputMode='numeric'
      maxLength={11}
      />
      <TextInput style={styles.text} 
      placeholder="Duração do servico:  *" 
      placeholderTextColor="lightyellow" 
      value={temp}
      onChangeText={text=>mudarTemp(text)} 
      inputMode='numeric'
      maxLength={11}

      />

      <TextInput style={styles.text} 
      placeholder="URL da imagem:"
      placeholderTextColor="lightyellow" 
      value={imagem}
      onChangeText={text=>mudarImagem(text)}
      
    />

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
              onPress={() => {setModalVisible(!modalVisible);}}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={cadastrar}>
        <Text style={styles.textStyle}>Cadastrar</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={retorna}>
        <Text style={styles.textStyle}>Voltar</Text>
      </Pressable>
      </View>
  </View>
  );
};

export default CadastraServico;

const stilo = StyleSheet.create({

    titulo:{
      color:'lightgreen',
      padding:15,
      textAlign:'center',
      fontSize:25,
      marginTop:25,
      marginBottom:25,
    }
    
  
  })
