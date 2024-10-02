import { Text, StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'blue',
    },
    text:  
   {
      fontSize: 20,
    },
  });
  
  const Agendamentos = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Agendamentos</Text>
      </View>
    );
  };
  
  export default Agendamentos;
  