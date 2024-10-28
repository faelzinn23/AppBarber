import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputDate = ({onInputDate}) => {
  const [date, setDate] = useState('');

  const handleDateChange = (input) => {
    // Você pode adicionar validação ou formatação de data aqui
    setDate(input)
    onInputDate(input);
  };

  return (
    <View style={styles.container}>
        <View style={{width:'100%'}}>
            <TextInput
                style={styles.input}
                placeholder="Digite a data (DD/MM/AAAA)"
                placeholderTextColor="white"
                value={date}
                onChangeText={handleDateChange}
            />
        </View>
      
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
  },
});

export default InputDate;