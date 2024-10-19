import { Text, StyleSheet,Image, View, TextInput,Button, Touchable, Pressable, Alert, Modal } from 'react-native';
import { useState } from 'react';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const navigation = useNavigation();

  const [condicao,setCondicao]=useState("informe seu login")
  const [user,setUser]= useState('fael');
  const [senha,setSenha]= useState('123');

//Aqui estamos armazenando os dados usando o AsyncStorage
const armazenarUsuario = async (value) => {
  try {
      const jsonValue = JSON.stringify(value); //serializando
      await AsyncStorage.setItem('usuario', jsonValue);
  } catch (e) {
      console.error(e);
  }
};


const retornoLogin = (data) => {
	console.log(data);
	armazenarUsuario(data);
	if (JSON.stringify(data) === '[]'){
    if (user == '' && senha =='')
		  setCondicao(("informe seu login"));
    else 
      setCondicao(("login incorreto"));
    setModalVisible(true)
  }else if (data[0]['usuario'] != "")
		if (data[0]['ADM'] !=""){
      navigation.navigate('MainTab');
    }else{
      navigation.navigate('MainClientTab');
    }
}


const validar = async () => {
  console.log(user + "-" + senha);
  const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: user, senha: senha })
  };
  //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
  await fetch('http://10.0.2.2:5000/login', requestOptions)
      .then(response => response.json())
      .then(data => retornoLogin(data))
      .catch(error => console.error('Error fetching data:', error));
}


  const mudarUser=(us)=>{
    setUser(us)
  }

  const mudarSenha=(sn)=>{
    setSenha(sn)
  }

  function cadastrar(){
      alert('clicou')
  
  }

  
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      
      <Image style={styles.imagem} source={uri= require("../../../assets/logo.png")}></Image>
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
        onPress={validar}>
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
