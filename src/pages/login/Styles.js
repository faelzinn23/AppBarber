import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#131313',
      padding:25
      
    },
    imagem:{
      maxHeight: 200,
      maxWidth: 200,
      justifyContent:'center',
      borderRadius:35,
      
  
    },
    text:{
        color:'lightyellow',
        textAlign:'center',
        height: 35,
        borderWidth:1,
        borderRadius:8,
        borderColor:'lightyellow',
        borderStyle:'solid',
        width:200,
        marginVertical:8,
        
        
  
      
    },
    titulo:{
      color:'lightyellow',
      padding:15,
      textAlign:'center',
      fontSize:17,
    },
    botao:{
      margin:29,
      width:'80%',
      
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
      borderRadius: 18,
      padding: 15,
      
    },
    buttonOpen: {
      backgroundColor: 'darkorange',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    }
  
  })
  export default styles;