import { Text, StyleSheet, View, FlatList,TouchableOpacity,Alert,Modal, Button, Pressable} from 'react-native';
import React, { useState,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import InputDate from './InputDate';
  const Agendamentos = () => {

    const [agendamentos, setAgendamentos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [infoId, setInfoId] = useState('');
    const [infoData, setInfoData] = useState('');
    const [infoHora, setInfohora] = useState('');
    const [infoServ, setInfoServ] = useState('');
    const [infoCli, setInfoCli] = useState('');
    const [infoStatus, setInfoStatus] = useState('');
    const [refresh,setRefresh] = useState(0)

    const recarregarPagina = () => {
      setRefresh(refresh + 1); 
    };
    const Agendamento = ({id,clientNome,servicoNome,idHorario,data,hora,status,dataF})=>{
      if(status == 'agendado'){
        return(
          <TouchableOpacity onPress={() => mostraModal(id,dataF,hora,servicoNome,clientNome,status)}>
            <View style={stilo.agendamento}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',}}>
                <View style={{ }}>
                <Text style={{fontSize:25,color:'white', }}>{clientNome[0].toUpperCase() + clientNome.substring(1)} </Text>
                <Text style={{fontWeight:'bold',color:'lightyellow',}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
                <Text style={{fontWeight:'bold',color:'lightyellow',}}>Hora:{hora}</Text>
                <Text style={{}}>id:{id}</Text>
                </View>
                <View style={{justifyContent:'space-between',alignItems:'flex-end',width:'50%'}}>
                <Text style={{fontSize:25,color:'white', }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
                <Text style={{backgroundColor:'lightyellow',padding:7}}>{status}</Text>
                </View>
              </View>
              
            </View>
            
      
            </TouchableOpacity>
            
        )
      }else if(status == 'cancelado'){
        return(
          <TouchableOpacity onPress={() => mostraModal1(id,dataF,hora,servicoNome,clientNome,status)}>
          <View style={stilo.agendamento}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',}}>
              <View style={{ }}>
              <Text style={{fontSize:25,color:'white', }}>{clientNome[0].toUpperCase() + clientNome.substring(1)} </Text>
              <Text style={{fontWeight:'bold',color:'lightyellow',}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
              <Text style={{fontWeight:'bold',color:'lightyellow',}}>Hora:{hora}</Text>
              <Text style={{}}>id:{id}</Text>
              </View>
              <View style={{justifyContent:'space-between',alignItems:'flex-end',width:'50%'}}>
              <Text style={{fontSize:25,color:'white', }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
              <Text style={{backgroundColor:'red',padding:7}}>{status}</Text>
              </View>
            </View>
            
          </View>
          </TouchableOpacity>
        )
      }else if(status == 'concluido'){
        return(
          <TouchableOpacity onPress={() => mostraModal1(id,dataF,hora,servicoNome,clientNome,status)}>
          <View style={stilo.agendamento}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',}}>
              <View style={{ }}>
              <Text style={{fontSize:25,color:'white', }}>{clientNome[0].toUpperCase() + clientNome.substring(1)} </Text>
              <Text style={{fontWeight:'bold',color:'lightyellow',}}>Data:{dataF[2]}/{dataF[1]}/{dataF[0]}</Text>
              <Text style={{fontWeight:'bold',color:'lightyellow',}}>Hora:{hora}</Text>
              <Text style={{}}>id:{id}</Text>
              </View>
              <View style={{justifyContent:'space-between',alignItems:'flex-end',width:'50%'}}>
              <Text style={{fontSize:25,color:'white', }}>{servicoNome[0].toUpperCase() + servicoNome.substring(1)} </Text>
              <Text style={{backgroundColor:'#1bad46',padding:7}}>{status}</Text>
              </View>
            </View>
            
          </View>
          </TouchableOpacity>
        )
      }
     
      
    };
     const mostraModal = (id,dataF,hora,servicoNome,clientNome,status) => {
      setInfoId (id);
      setInfoData(dataF);
      setInfohora(hora);
      setInfoServ(servicoNome);
      setInfoCli(clientNome);
      setInfoStatus(status);
      setModalVisible(true)
      
     }
     const mostraModal1 = (id,dataF,hora,servicoNome,clientNome,status) => {
      setInfoId (id);
      setInfoData(dataF);
      setInfohora(hora);
      setInfoServ(servicoNome);
      setInfoCli(clientNome);
      setInfoStatus(status);
      setModal1Visible(true)
      
     }
    
    const renderAgendamento = ({ item }) => {
      return(
        <Agendamento 
        id={item.id} 
        clientNome ={item.nome_cliente}   
        servicoNome ={item.nome_servico}   
        idHorario= {item.id_horario} 
        data= {item.data} 
        hora= {item.hora} 
        status={item.status}
        dataF= { item.data.split('-')}
        />
    
      );
    };

    const obterListaAgendamentos = async () => {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ data :date})
      };
      
      await fetch('http://10.0.2.2:5000/agendaBarb',requestOptions)
          .then(response => response.json())
          .then(products => setAgendamentos(products))
          .catch(error => console.error('Error fetching data:', error));
      };

      const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
        const year = date.getFullYear();
        
        return `${year}-${month}-${day}`;
      }
      const [date, setDate] = useState(getCurrentDate());
  
      

  

    
    const formataData = (dateString) => {
      const [dia, mes, ano] = dateString.split('/');
      return `${ano}-${mes}-${dia}`;
    };

    const salvaData=(data) =>{
      const dataFormatada=formataData(data)
      setDate(dataFormatada)
      
    }
    const concluirAgendamento= async () =>{
      Alert.alert(
        'Confirmação',
        'Concluir Atendimento?' ,
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {
            concluiAt()
            
      
      }},
    ],
    { cancelable: false },
  );  
      
    }

    const cancelaAgendamento = async() =>{
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja cancelar o agendamento' ,
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {
            cancela()
            
      
      }},
    ],
    { cancelable: false },
  );  
      
    }
    const cancela = async () => {
      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:infoId})
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
      await fetch('http://10.0.2.2:5000/agendaBarb', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
      
    }
    const concluiAt = async () => {
      const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:infoId})
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
      await fetch('http://10.0.2.2:5000/agendaBarb', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
      
    }



    const conclui = (msg) => {
      if(msg.error){
        alert(msg.error)
      }else{
        alert(msg.status)
      }
      setModalVisible(false)
      recarregarPagina()
    }

    useFocusEffect(
      React.useCallback(() => {
        obterListaAgendamentos();
      },[date,refresh])
    );
    return (
      <View style={stilo.container}>
        <View style={stilo.item}>
        <View style={stilo.data}>  
        <InputDate onInputDate={salvaData}/>
        </View>
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            renderAgendamento({item})
          )}
          ListEmptyComponent={() => (
            <View style={stilo.vasio}>
              <Text style={{fontSize:25,textAlign:'center',color:'lightyellow',}}>Nao possui nenhum agendamento para esta data</Text>
            </View>
          )}
        />
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stilo.modalContainer}>
          <View style={stilo.modalContent}>
            <Text style={stilo.modalTitle}>Agendamento {infoId} </Text>
            <Text style={{fontSize:20, margin:5}}>Cliente: {infoCli} </Text>
            <Text style={{fontSize:20, margin:5}}>Servico: {infoServ} </Text>
            <Text style={{fontSize:20, margin:5}}>Data: {infoData[2]}/{infoData[1]}/{infoData[0]} </Text>
            <Text style={{fontSize:20, margin:5}}>Hora: {infoHora} </Text>
            <Text style={{fontSize:20, margin:5}}>Status: {infoStatus} </Text>
            <Pressable style={stilo.btnDisp}
                  onPress={() => {concluirAgendamento()}}>
                  <Text >Concluir Atendimento</Text>
            </Pressable>

            <Pressable style={stilo.btnClose}
                  onPress={() => {cancelaAgendamento()}}>
                  <Text >Cancelar Agendamento</Text>
            </Pressable>

            <Pressable style={[stilo.btnClose,{backgroundColor:'#728afe'}]}
                  onPress={() => {setModalVisible(false)}}>
                  <Text style={{fontWeight:'bold'}}>Fechar</Text>
            </Pressable>

            
          </View>
        </View>
        </Modal>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => setModal1Visible(false)}
      >
        <View style={stilo.modalContainer}>
          <View style={stilo.modalContent}>
            <Text style={stilo.modalTitle}>Agendamento {infoId} </Text>
            <Text style={{fontSize:20, margin:5}}>Cliente: {infoCli} </Text>
            <Text style={{fontSize:20, margin:5}}>Servico: {infoServ} </Text>
            <Text style={{fontSize:20, margin:5}}>Data: {infoData[2]}/{infoData[1]}/{infoData[0]} </Text>
            <Text style={{fontSize:20, margin:5}}>Hora: {infoHora} </Text>
            <Text style={{fontSize:20, margin:5}}>Status: {infoStatus} </Text>
          
            <Pressable style={[stilo.btnClose,{backgroundColor:'#728afe'}]}
                  onPress={() => {setModal1Visible(false)}}>
                  <Text style={{fontWeight:'bold'}}>Fechar</Text>
            </Pressable>
          </View>
        </View>
        </Modal>

      </View>
    );
  };
  
  export default Agendamentos;

  const stilo = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'top',
      backgroundColor:'#303030',
      paddingHorizontal:'7%'
    },
    data: {
      alignItems: 'center',
    },
    agendamento: {
      
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#373737',
      padding: 10,
      marginVertical:15,
      borderRadius:5,
      elevation:10,
      width:'100%',
      height:100
      
      
    },
    vasio: {
      
      alignItems:' center',
      justifyContent:'center',
      backgroundColor:'#373737',
      
      marginTop:'40%',
      borderRadius:5,
      elevation:20,
      width:'100%',
      
      
      
    },
    item:{
      
      width:'100%'
      


    },
    titulo:{
      fontSize:30,
      color:'lightyellow',
      marginBottom:25,
      
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalContent: {
      width: '84%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      maxHeight:500,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign:'center',
    },
    modalItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  
    },
    modalText: {
      fontSize: 16,
    },
    btnClose:{
      borderRadius:5,
      backgroundColor:'red',
      paddingVertical:12,
      elevation:10,
      justifyContent: 'flex-end',
      alignItems:'center',
      marginHorizontal:'20%',
      marginBottom:15,
      
    },
    btnDisp:{
      borderRadius:5,
      marginBottom:15,
      marginTop:15,
      paddingVertical:12,
      elevation:10,
      justifyContent: 'flex-end',
      alignItems:'center',
      marginHorizontal:'20%',
      backgroundColor:'#1bad46',
    },

})