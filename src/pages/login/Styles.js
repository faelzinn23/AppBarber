import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      padding: 8,
    },
    imagem:{
      maxHeight: 200,
      maxWidth: 200,
      justifyContent:'center',
      borderRadius:35,
      
  
    },
    text:{
        textAlign:'center',
        height: 35,
        borderWidth:1,
        borderRadius:8,
        borderStyle:'solid',
        width:150,
        margin:15,
        
  
      
    },
    titulo:{
      padding:15,
      textAlign:'center',
      fontSize:17,
    },
    botao:{
      padding:50,
      width:'100%',
      
      borderRadius:28,
    },
    cadastro:{
      color:'blue',
      textDecorationLine:"underline",
      
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    }
  
  })
  export default styles;