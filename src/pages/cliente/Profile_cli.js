import { Text, StyleSheet, View, Pressable,Image} from 'react-native';
import {useState,useEffect} from 'react';
import styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Profile_cli = ({navigation}) => {

    
      const [usuario, setUsuario] = useState({});

      useEffect(() => {
          obterDadosUsuario();
      }, []);
  
      //Aqui estamos recuperando os dados usando o AsyncStorage
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

      const sair = async () => {
      try {
          await AsyncStorage.clear();
      } catch (e) {
          console.error(e);
      }
      console.log('Done.')

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
 
    return (
      <View style={styles.container}>
        <View style={stilo.info}>
        <Image style={stilo.imagem} source={uri= require("../../assets/perfil.png")}></Image>
          <Text style={stilo.text}>Nome: {usuario.name}</Text>
          <Text style={stilo.text}>Usuario: {usuario.usuario}</Text>
          <Text style={stilo.text}>Email: {usuario.email}</Text>
          <Text style={stilo.text}>Telefone: {usuario.telefone}</Text>

        </View>
        <View >
          <Pressable style={stilo.butao}
            onPress={sair}>
            <Text >Sair</Text>
          </Pressable>
        </View>

      </View>
    );
  };
  
export default Profile_cli;
  
  const stilo = StyleSheet.create({
  
    butao:{
     
      backgroundColor:'orange',
      paddingHorizontal:'25%',
      paddingVertical:15,
      elevation:20,
      borderRadius:20,
      justifyContent: 'flex-end',
      marginBottom:20,
    },
    info:{
      padding:50,
      textDecorationColor:'white',
      flex:1,
      alignItems:'center',
      Color:'white',
    },

    imagem:{
      
      backgroundColor:'white',
      borderRadius:200,
    },
    text:{
      color:'white',
      fontSize:20,
    }

    
  
  })
