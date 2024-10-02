import { Text, StyleSheet, View } from 'react-native';
import React from 'react';

const stylo = StyleSheet.create({
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
  
  const Profile = () => {
    return (
      <View style={stylo.container}>
        <Text style={stylo.text}>Profile</Text>
      </View>
    );
  };
  
  export default Profile;
  