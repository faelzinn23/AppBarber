import React, { useState,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, StyleSheet,TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const InputDate = ({onInputDate}) => {
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  const Data = ({data,dataF})=>(
    <View >
    <TouchableOpacity
        style={styles.modalItem}
            onPress={() => {
            setDate(`${dataF[2]}/${dataF[1]}/${dataF[0]}`);
            setModalVisible(false);
            onInputDate(`${dataF[2]}/${dataF[1]}/${dataF[0]}`)
            }}
                >
            <Text style={styles.modalText}>{`${dataF[2]}/${dataF[1]}/${dataF[0]}`}</Text>
        </TouchableOpacity>  
    </View>
);
  const renderData = ({ item }) => {
    return(
      <Data
      data= {item.data} 
      dataF= {item.data.split('-')}
      />
  
    );
  };



  const [date, setDate] = useState(getCurrentDate());
  const [modalVisible, setModalVisible] = useState(false);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);

  const obterDatasDisponiveis = async () => {
    await fetch('http://10.0.2.2:5000/agendaBarb',)
            .then(response => response.json())
            .then(datas => setDatasDisponiveis(datas))
            .catch(error => console.error('Error fetching data:', error));
};


   
    useFocusEffect(
      React.useCallback(() => {
        obterDatasDisponiveis();
      },[date])
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>{date}</Text>
      </TouchableOpacity>

    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma data:</Text>
            <FlatList
              data={datasDisponiveis}
              keyExtractor={(item) => item.data}
              renderItem={({ item }) => (
                renderData({item})
              )}
            />
            <Button title="Fechar" onPress={() => {setModalVisible(false)}} />
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:10,
    backgroundColor:'#303030',
    width:'85%',
  },
  input: {
    marginTop:'15%',
    color: 'white',
    fontSize: 20,
    padding:20,
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight:'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  horarioItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    maxHeight:300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  modalText: {
    fontSize: 16,
  },
});

export default InputDate;