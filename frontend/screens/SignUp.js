import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import axios from 'axios';

function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  

  const getPosts = async () => {
    try{
      const response = await fetch('http://192.168.18.94:3000/accounts/');
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e)
    }
}

  const makeAccount = async () => {
    // const postStudentData = async (eMail, fullName, password, eduDetails) => {
      // console.log(email, password, confirmPassword);
      if(password == confirmPassword){
        try {
            console.log(email, password, confirmPassword + ' inside if');
            axios.post('http://192.168.18.94:3000/accounts/', {
              "email": email,
              "password": password
            })
            .then(function (response) {
              let banksAdded = createBankAccounts();
              console.log(banksAdded);
              // if(banksAdded){
                console.log(response);
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setTimeout(() => {
                  navigation.navigate('Login')
                }, 2000);
              // } else{ 
                return 'error with adding banks'
              // }
            })
            .catch(function (error) {
              console.log(error);
            });
        } catch (e) {
            return e;
        }
    // }
      }
  }

  const createBankAccounts = () => {
    try {
      axios.post('http://192.168.18.94:3000/bankaccounts', {
        "email": email,
          "name": "Cash",
          "amount": 0
      }).then(function(response){
        // console.log(response);
        return response;
      }).catch(function(error){
        // console.log(error);
        return error;
      })
      axios.post('http://192.168.18.94:3000/bankaccounts', {
        "email": email,
          "name": "Savings",
          "amount": 0
      }).then(function(response){
        // console.log(response);
        return response;
      }).catch(function(error){
        // console.log(error);
        return error
      })
    } catch(e) {
      return e;
    }
  }

    return (
      <View style={{backgroundColor:'black', height:'100%', display: 'flex', alignItems:'center', justifyContent:'center', gap: 10}}>
          <Text variant='displayMedium' style={{color:'white'}}>SignUp</Text>
          <TextInput
              label="Enter Email"
            //   placeholder="Enter Email"
              textColor='white'
              activeUnderlineColor='#1ba0a5'
              onChangeText={newText => setEmail(newText)}
              style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10 }}
          />
          <TextInput
              label="Enter Password"
            //   placeholder="Enter Password"
              textColor='white'
              activeUnderlineColor='#1ba0a5'
              secureTextEntry
              onChangeText={newText => setPassword(newText)}
              style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10}}
          />
          <TextInput
              label="Confirm Password"
            //   placeholder="Confirm Password"
                activeUnderlineColor='#1ba0a5'
              textColor='white'
              secureTextEntry
              onChangeText={newText => setConfirmPassword(newText)}
              style={{backgroundColor: 'black', width: 300, marginTop: 10, marginBottom: 10}}
          />
          <View>
          <Text style={{color: 'white'}}>Already Have an Account? Sign in <TouchableOpacity onPress={() => {navigation.navigate('Login')}}><Text style={{color: '#1ba0a5', fontWeight: '600', paddingLeft: 5}}> Here </Text></TouchableOpacity></Text>
        </View>
          <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5'}} onPress={() => makeAccount()}>
              SignUp
          </Button>
      </View>
    )
  }

export default SignUp