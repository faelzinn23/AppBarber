import { Text, StyleSheet,Image, View, TextInput,Button, Touchable, Pressable, Alert, Modal } from 'react-native';
import { useState } from 'react';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  var usuario= "raphael";
  var password="123456";
  const [condicao,setCondicao]=useState("informe seu login")
  const [user,setUser]= useState('');
  const [senha,setSenha]= useState('');
  const mudarUser=(us)=>{
    setUser(us)
  }

  const mudarSenha=(sn)=>{
    setSenha(sn)
  }

  function cadastrar(){
      alert('clicou')
  
  }
  function entrar(){
    
      if (user == usuario && senha == password){
        navigation.navigate('MainTab')
      } else{
        setCondicao("Login incorreto")
        setModalVisible(true)
      }
      
  }
  
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      
      <Image style={styles.imagem} source={uri= require("../../assets/logo.png")}></Image>
      <Text style={styles.titulo}>My App</Text>
      <TextInput style={styles.text} placeholder="digite o usuario" 
      value={user}
      onChangeText={text=>mudarUser(text)} 
      />

      <TextInput style={styles.text} 
    placeholder="digite a senha"
    value={senha}
    onChangeText={text=>mudarSenha(text)}
    secureTextEntry={true}
    />

    {/* 
    <Button title='entar' 
            color=''
            onPress={entrar}
    ></Button>
     */}
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
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={entrar}>
        <Text style={styles.textStyle}>Entrar</Text>
      </Pressable>
      </View>
      <Text style={{marginTop:-30}}>
        Não possui cadastro?  
        <Text onPress={() => navigation.navigate('Cadastro')}
            style={styles.cadastro}
        >Cadastrar
        </Text>
      </Text>
  </View>


  );


};
export default Login;
