import { Text, StyleSheet,Image, View, TextInput,Button, Touchable, Pressable, Alert, Modal } from 'react-native';
import { useState } from 'react';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';



const Cadastro = () => {
  const navigation = useNavigation();
  var usuario= "raphael";
  var password="123456";
  const [condicao,setCondicao]=useState("informe seu login")
  const [user,setUser]= useState('');
  const [nome,setNome]= useState('');
  const [numero,setNumero]= useState('');
  const [senha1,setSenha1]= useState('');
  const [senha,setSenha]= useState('');

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

  function cadastrar(){
      alert('clicou')
  
  }
  function entrar(){
    
      if (user == '' || nome == '' || numero == '' || senha == '' || senha1 ==''){
        setCondicao("Preencha todos os campos")
      } else if( senha != senha1){
        setCondicao("A senha digitada deve ser igual nos dois campos")
      }else{
        setCondicao("cadatro criado com sucesso!")
        
      }
      setModalVisible(true)
  }
  
  function conclui(){
    
    if (condicao == "cadatro criado com sucesso!"){
        navigation.navigate('Login')
    }
    
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      
      <Image style={styles.imagem} source={uri= require("../../assets/logo.png")}></Image>
      <Text style={stilo.titulo}>Seja Bem-Vindo(a)!</Text>
      <TextInput style={styles.text} 
      placeholder="informe seu Nome" 
      value={nome}
      onChangeText={text=>mudarNome(text)} 
      />
      <TextInput style={styles.text} 
      placeholder="Informe seu E-mail" 
      value={user}
      onChangeText={text=>mudarUser(text)} 
      autoComplete='email'
      inputMode='email'
      />
      <TextInput style={styles.text} 
      placeholder="Digite seu numero de celular" 
      value={numero}
      onChangeText={text=>mudarNumero(text)} 
      autoComplete='cc-number'
      inputMode='numeric'
      maxLength={11}
      />

      <TextInput style={styles.text} 
      placeholder="crie uma senha"
      value={senha}
      onChangeText={text=>mudarSenha(text)}
      secureTextEntry={true}
    />
      <TextInput style={styles.text} 
      placeholder="digite novamente a senha"
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
              onPress={() => {setModalVisible(!modalVisible);conclui();}}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={entrar}>
        <Text style={styles.textStyle}>Cadastrar</Text>
      </Pressable>
      </View>
      <Text style={{marginTop:-30}}>
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
      padding:15,
      textAlign:'center',
      fontSize:25,
      marginTop:25,
      marginBottom:25,
    },
    
  
  })