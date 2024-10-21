import { Text, StyleSheet,Image, View, TextInput,Button, Touchable, Pressable, Alert, Modal } from 'react-native';
import { useState } from 'react';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Cadastro = ({navigation}) => {

  const [condicao,setCondicao]=useState(null)
  const [user,setUser]= useState(null);
  const [nome,setNome]= useState(null);
  const [numero,setNumero]= useState(null);
  const [senha1,setSenha1]= useState(null);
  const [senha,setSenha]= useState(null);
  const [email,setEmail]= useState(null);

  const mudarUser=(us)=>{
    setUser(us)
  }
  const mudarNome=(nm)=>{
    setNome(nm)

  }
  const mudarNumero=(nmr)=>{
    setNumero(nmr)

  }
  const mudarSenha1=(sn1)=>{
    setSenha1(sn1)

  }
  const mudarSenha=(sn)=>{
    setSenha(sn)
  }
  mudarEmail=(em)=>{
    setEmail(em)
  }
  const cadastrar = async () => {
    
    console.log(user + "-" + senha);
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:nome,email:email,usuario: user, senha: senha,telefone :numero })
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
    await fetch('http://10.0.2.2:5000/cadastra', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
        
  }

  function entrar(){
    if (condicao == 'cadastrado'){
      navigation.navigate('Login');
    }
  }
  
  function conclui(msg) {
  
    if (!user  || !nome   || !numero  || !senha  || !senha1){
      setCondicao("Preencha todos os campos")
    } else if( senha != senha1){
      setCondicao("A senha digitada deve ser igual nos dois campos")
    } else if (msg.error) {
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
      
      <Image style={styles.imagem} source={uri= require("../../../assets/logo.png")}></Image>
      <Text style={stilo.titulo}>Seja Bem-Vindo(a)!</Text>
      <TextInput style={styles.text} 
      placeholder="informe seu Nome" 
      placeholderTextColor="lightyellow" 
      value={nome}
      onChangeText={text=>mudarNome(text)} 
      />
      <TextInput style={styles.text} 
      placeholder="Informe seu E-mail" 
      placeholderTextColor="lightyellow" 
      value={email}
      onChangeText={text=>mudarEmail(text)} 
      autoComplete='email'
      inputMode='email'
      />
      <TextInput style={styles.text} 
      placeholder="crie um usuario" 
      placeholderTextColor="lightyellow" 
      value={user}
      onChangeText={text=>mudarUser(text)} 
      autoComplete='email'
      inputMode='email'
      />
      <TextInput style={styles.text} 
      placeholder="Digite seu numero de celular" 
      placeholderTextColor="lightyellow" 
      value={numero}
      onChangeText={text=>mudarNumero(text)} 
      autoComplete='cc-number'
      inputMode='numeric'
      maxLength={11}
      />

      <TextInput style={styles.text} 
      placeholder="crie uma senha"
      placeholderTextColor="lightyellow" 
      value={senha}
      onChangeText={text=>mudarSenha(text)}
      secureTextEntry={true}
    />
      <TextInput style={styles.text} 
      placeholder="digite novamente a senha"
      placeholderTextColor="lightyellow" 
      value={senha1}
      onChangeText={text=>mudarSenha1(text)}
      secureTextEntry={true}
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
              onPress={() => {setModalVisible(!modalVisible);entrar();}}>
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
      </View>
      <Text style={{marginTop:-25,color:'#ffff7d'
      }}>
        Ja é cadastrado?  
        <Text onPress={() => navigation.navigate('Login')}
            style={styles.cadastro}
        > Logar
        </Text>
      </Text>
  </View>
  );
};

export default Cadastro;

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
