import { Text, StyleSheet, View, FlatList, ScrollView,SectionList, Image, Pressable,Alert } from 'react-native';
import { useState,useEffect } from 'react';
import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import styles from './Styles'
import { useFocusEffect } from '@react-navigation/native';

const Produtos = ({navigation})=>{
  
  
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const data = [
    {title: 'Serviços',data: servicos, },
    {title: 'Produtos',data: produtos, },
  ];
  const [refresh,setRefresh] = useState(0)

  const recarregarPagina = () => {
    setRefresh(refresh + 1); 
  };

  const Produto = ({id,nome,preco,imagem,descricao})=>(
    <View style={stilo.itens}>
        <Image style={stilo.imagem} source={{uri:imagem}}></Image>
        <View style={stilo.inf}>
          <Text style={stilo.nome}>{nome[0].toUpperCase() + nome.substring(1)}</Text>
          <Text style={stilo.desc}>{descricao[0].toUpperCase() + descricao.substring(1)}</Text>
          <Text></Text>
          <Text style={stilo.preco}>R${(preco.toFixed(2))}</Text>
        </View>
        <View>
      <Pressable
          onPress={() => exclui(id,nome,1)}>
          <Ionicons name='trash-outline' size={50} color={'color'} />
        </Pressable>
      </View>
    </View>
  );
  const Servico = ({id,nome,preco,imagem,descricao,duracao})=>(
    <View style={stilo.itens}>
      <Image style={stilo.imagem} source={{uri:imagem}}></Image>
      <View style={stilo.inf}>
        <Text style={stilo.nome}>{nome[0].toUpperCase() + nome.substring(1)}</Text>
        <Text style={stilo.desc}>{descricao[0].toUpperCase() + descricao.substring(1)}</Text>
        <Text style={stilo.dur}>Tempo de execução:{duracao}min</Text>
        <Text style={stilo.preco}>R${(preco.toFixed(2))}</Text>
      </View>
      <View>
      <Pressable
          onPress={() => exclui(id,nome,0)}>
          <Ionicons name='trash-outline' size={50} color={'black'} />
        </Pressable>
      </View>
    </View>
  );
  const renderProduto = ({ item }) => {
    return(
      <Produto 
      descricao ={item.descricao}   
      id={item.id} 
      imagem = {item.imagem} 
      nome= {item.nome} 
      preco= {item.preco} 
      />
  
    );
  };
  const renderServico = ({ item }) => {
    return(
      <Servico 
      descricao={item.descricao} 
      duracao={item.duracao}  
      id={item.id} 
      imagem ={item.imagem} 
      nome={item.nome} 
      preco={item.preco} 
      />
    );
  };

  const obterListaProdutos = async () => {
    await fetch('http://10.0.2.2:5000/produtos')
        .then(response => response.json())
        .then(products => setProdutos(products))
        .catch(error => console.error('Error fetching data:', error));
    };

    const obterListaServicos = async () => {
      await fetch('http://10.0.2.2:5000/servicos')
                .then(response => response.json())
                .then(services => setServicos(services))
                .catch(error => console.error('Error fetching data:', error));
    };
    


    const adiciona = async (tabela) => {
      
      if (tabela == 'Produtos'){
        navigation.navigate('CadastraProduto')
      }else{
        navigation.navigate('CadastraServico')
      }

    }
    const deletaProd = async (id) => {
      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id})
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
      await fetch('http://10.0.2.2:5000/produtos', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
      
    }
    const deletaServ = async (id) => {
      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id})
    };
    //caso esteja utilizando o emulador Android, usar o ip 10.0.2.2
      await fetch('http://10.0.2.2:5000/servicos', requestOptions)
        .then(response => response.json())
        .then(data => conclui(data))
        .catch(error => console.error('Error fetching data:', error));
      
    }
    
    const exclui = async (id,nome,tipo) => {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja excluir ' + nome,
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {
            if(tipo == 1){
              deletaProd(id)
            }else{
              deletaServ(id)
            }
            
      
      }},
    ],
    { cancelable: false },
  );  
      
      
    }

    const conclui = (msg) => {
      if(msg.error){
        alert(msg.error)
      }else{
        alert(msg.status)
      }
      recarregarPagina()
    }
    useFocusEffect(
      React.useCallback(() => {
        obterListaProdutos();
        obterListaServicos();
      },[refresh])
    );
 

  return (
    <View style={stilo.conteiner}>
      <SectionList
        sections={data}
        renderItem={({ item }) => {
          if (item.duracao) {
            return renderServico({ item });
          }  else {
            return renderProduto({ item });
          }
        }}
        renderSectionHeader={({ section: { title } }) => ( 
          <View style={stilo.header}>
            <Text style={stilo.secao}>{title}:</Text>
            <View style={stilo.adiciona}>
              <Pressable
              onPress={() => adiciona(title)}>
              <Text style={{}} >Adicionar {title.slice(0 , -1)}</Text>
              </Pressable>
            </View>
          </View>   
        )}
          keyExtractor={(item) => item.id}
              
      />   
        </View>
      );
}
export default Produtos;

const stilo = StyleSheet.create({
  conteiner:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#303030',
    paddingTop:50,
    paddingHorizontal:'7%'
    
        
  },
  adiciona:{
    justifyContent:'center',
    backgroundColor:'yellow',
    borderRadius:10,
    padding:5

  },
  header:{
    
    justifyContent:'space-between',
    flexDirection:'row',
    
  },

  itens:{
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    backgroundColor:'#ff9a1e',
    marginVertical:10,
    flexGrow:1,
    flexDirection:'row',
    shadowColor: 'yellow',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
    
  },
  secao:{
    fontSize:20,
    color:'lightyellow',
    
  },
  imagem:{
  margin:2,
  borderRadius:10,
  justifyContent:'flex-start',
  width:100,
  height:100,
  
  },
  
  nome:{
    
    margin:2,
    fontSize:20,
    fontWeight:'bold'
  },
  desc:{
    margin:2,
    
    fontSize:15,
    fontStyle:'italic'
  },
  dur:{
    
    
    fontSize:12,
    fontStyle:'italic'
  },
  preco:{
    fontWeight:'bold',
    margin:2,
    fontSize:18,
  },
  inf:{
    
    flex:1,
    height:'100%',
    
    
    
  },
  

})