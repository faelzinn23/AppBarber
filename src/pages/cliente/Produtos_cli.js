import { Text, StyleSheet, View, FlatList, ScrollView,SectionList, Image, Pressable,Alert } from 'react-native';
import { useState,useEffect } from 'react';
import React from 'react';
import {Ionicons} from '@expo/vector-icons'



const Produtos_cli = ({navigation})=>{
  
  
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const data = [
    {title: 'Serviços',data: servicos, },
    {title: 'Produtos',data: produtos, },
  ];

  const Produto = ({id,nome,preco,imagem,descricao})=>(
    <View style={stilo.itens}>
        <Image style={stilo.imagem} source={{uri:imagem}}></Image>
        <View style={stilo.inf}>
          <Text style={stilo.nome}>{nome[0].toUpperCase() + nome.substring(1)}</Text>
          <Text style={stilo.desc}>{descricao[0].toUpperCase() + descricao.substring(1)}</Text>
          <Text></Text>
          <Text style={stilo.preco}>R${(preco.toFixed(2))}</Text>
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
    
    useEffect(() => {
      obterListaProdutos();
      obterListaServicos();
      
    }, []);


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
          <View >
            <Text style={stilo.secao}>{title}:</Text>
          </View>   
        )}
          keyExtractor={(item) => item.id}
              
      />   
        </View>
      );
}
export default Produtos_cli;

const stilo = StyleSheet.create({
  conteiner:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor:'#303030',
    paddingHorizontal:20,
    paddingTop:50,
    
        
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