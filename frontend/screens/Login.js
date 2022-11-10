import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loggedOff, setLoggedOff] = useState(false);

  useEffect(() => {
    if(loggedOff){
      deleteSession();
    }
  }, []);

  const deleteSession = async () => {
    await AsyncStorage.removeItem("user");
    return true;
  }
  
  const getUserAccounts = async (userData) => {
    try{
      const response = await fetch('http://192.168.18.94:3000/bankaccounts/'+userData)
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        return error;
      })
      const data = response;
      // console.log(data);
      // return response.json();
    } catch (e) {
      console.log(e)
    }
}

const getUserTransactions = async(userData) => {
  try{
    const response = await fetch('http://192.168.18.94:3000/transactions/'+userData)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      return error;
    })
      const data = response;
      // console.log(data);
      // return response.json();
  } catch(e) {
    console.log(e)
  }
}

  const makeAccount = async () => {
    // const postStudentData = async (eMail, fullName, password, eduDetails) => {
      try {
          const response = await fetch("http://192.168.18.94:3000/accounts/password/"+email)
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        return error;
      })
          const res = response;
          console.log(res[0].password)
          if (res[0].password == password) {
              let userAccounts = getUserAccounts(email);
              let userTransactions = getUserTransactions(email);
              try{
                await AsyncStorage.setItem("user", JSON.stringify(email));
                await AsyncStorage.setItem("userAccounts", JSON.stringify(userAccounts));
                await AsyncStorage.setItem("userTransactions", JSON.stringify(userTransactions));
              } catch(e) {
                console.log(e);
              }
              navigation.navigate('Dashboard');
              console.log('Cleared')
              return res;
          }
      } catch (e) {
          return e;
      }
  // }
  }

  const addTransaction = () => {
    
  }

  return (
    <View style={{backgroundColor:'black', height:'100%', display: 'flex', alignItems:'center', justifyContent:'center', gap: 10}}>
        <Text variant='displayMedium' style={{color:'white'}}>Login</Text>
        <TextInput
            label="Enter Email"
            // placeholder="Enter Email"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            onChangeText={newText => setEmail(newText)}
            style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10 }}
        />
        <TextInput
            label="Enter Password"
            // placeholder="Enter Password"
            textColor='white'
            secureTextEntry
            onChangeText={newPass => setPassword(newPass)}
            activeUnderlineColor='#1ba0a5'
            style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10}}
        />
        <View>
          <Text>Don't Have an Account? Create one <TouchableOpacity onPress={() => {navigation.navigate('SignUp')}}><Text style={{color: '#1ba0a5', fontWeight: '600'}}>Here</Text></TouchableOpacity></Text>
        </View>
        <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5'}} onPress={() => makeAccount()}>
            Log in
        </Button>
    </View>
  )
}

export default Login