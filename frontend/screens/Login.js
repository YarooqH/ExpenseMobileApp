import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';

function Login() {
  return (
    <View style={{backgroundColor:'black', height:'100%', display: 'flex', alignItems:'center', justifyContent:'center', gap: 10}}>
        <Text variant='displayMedium' style={{color:'white'}}>Login</Text>
        <TextInput
            label="Enter Email"
            // placeholder="Enter Email"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10 }}
        />
        <TextInput
            label="Enter Password"
            // placeholder="Enter Password"
            textColor='white'
            secureTextEntry
            activeUnderlineColor='#1ba0a5'
            style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10}}
        />
        <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5'}} onPress={() => console.log('Pressed')}>
            Log in
        </Button>
    </View>
  )
}

export default Login