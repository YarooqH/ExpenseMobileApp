import React, {useState, useEffect, useContext} from 'react';
import { ActivityIndicator, StyleSheet, ToastAndroid, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../context';

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );    
    return null;
  }
  return null;
};

function Login({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loggedOff, setLoggedOff] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [userBanks, setUserBanks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('Please Enter Proper Email Address.');

  let banks, cats, transactions;

  const { dispatchUserEvent } = useContext(AppContext);

  const setData = (email, userBanks, userTransactions, userCategories) => {
    dispatchUserEvent('SET_USER_EMAIL', {userEmail: email});
    dispatchUserEvent('SET_USER_TRANSACTIONS', {userTransactions: userTransactions});
    // console.log('Here: ' + userBanks);
    dispatchUserEvent('SET_USER_BANKS', {userBanks: userBanks});
    dispatchUserEvent('SET_USER_CATEGORIES', {userCategories: userCategories});
  }

  useEffect(() => {
    setShowToast(false);
    // checkUserSession();
    // if(loggedOff){
    //   deleteSession();
    // }
  }, [isLoading, showToast, toastMsg]);

  const deleteSession = async () => {
    await AsyncStorage.removeItem("user");
    return true;
  }

  const setSession = async (email) => {
    await AsyncStorage.setItem("user", email);
    return true;
  }

  const getSession = async () => {
    try{
      let _user = await AsyncStorage.getItem("user");
      if(_user){
        return true 
      } else {
        return false
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  const checkUserSession = () => {
    // let res = getSession();
    if (res) {
      // deleteSession("user");
      dispatchUserEvent("REMOVE_USER_EMAIL");
      dispatchUserEvent("REMOVE_USER_TRANSACTIONS");
      dispatchUserEvent("REMOVE_USER_CATEGORIES");
      dispatchUserEvent("REMOVE_USER_BANKS");
      dispatchUserEvent("REMOVE_USER_BALANCE");
      // setData('', [], []);
    }
  }

  const getUserAccounts = async (userData) => {
    try{
      console.log('1st: ' + userData);
      const response = await fetch('http://192.168.18.94:3000/bankaccounts/'+userData);
      const data = JSON.stringify(await response.json());
      // console.log('userBanks: ' + data);
      banks = data;
      setUserBanks(data);
      // console.log(data);
      // return response.json();
    } catch (e) {
      console.log(e)
    }
}

const getUserTransactions = async(userData) => {
  try{
    const response = await fetch('http://192.168.18.94:3000/transactions/'+userData)
    const data = JSON.stringify(await response.json());
      // const data = response;
      transactions = data;
    setUserTransactions(data);
      // console.log(data);
      // return response.json();
  } catch(e) {
    console.log(e)
  }
}

const getUserCategories = async(userData) => {
  try{
    const response = await fetch('http://192.168.18.94:3000/categories/'+userData)
    const data = JSON.stringify(await response.json());
      // const data = response;
      cats = data;
      setUserCategories(data);
      // console.log(data);
      // return response.json();
  } catch(e) {
    console.log(e)
  }
}

  const makeAccount = async () => {
    // console.log("email: " + email.length + " password: " + password.length);
    if(email.length >= 4 && password.length >= 4){
      try {
          const response = await fetch("http://192.168.18.94:3000/accounts/password/"+email)
          .then((data) => {
            return data.json();
          })
          .catch((error) => {
            setToastMsg('Please Enter Proper Credentials');
            setShowToast(true);
            return error;
          })
          const res = response;
          console.log(res[0].password);
          console.log(email.length);
          if (res[0].password == password) {
            // if(email.length > 3){
              let userAccounts_ = getUserAccounts(email);
              let userTransactions_ = getUserTransactions(email);
              let userCategories_ = getUserCategories(email);
              // setSession(email);
                setLoading(true);
                setTimeout(()=>{
                  console.log(email, banks, transactions, cats);
                  let newdata = setData(email,banks, transactions, cats);
                  navigation.navigate('Dashboard');
                }, 500);
                // }
              console.log('Cleared')
              return res;
            // } else {
              // console.log('sugs')
              // <Toast visible={true} message={"Please Enter Proper Email Address."}/>
              // setToastMsg('Please Enter Proper Email Address')
              // setShowToast(true);
            // }
          } else {
            setToastMsg("Incorrect Email or Password")
            setShowToast(true);
            // setShowToast(false);
            // <Toast visible={true} message={"Passwords Don't Match."}/>
          }
      } catch (e) {
          return e;
      } 
    } else {
      setToastMsg("Incorrect Email or Password")
      setShowToast(true);
      // setShowToast(false);
    }
    // const postStudentData = async (eMail, fullName, password, eduDetails) => {
  // }
  }

  if(isLoading){
    return (
      <View style={{height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#1ba0a5" />
      </View>
    )
  } else {
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
          <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5'}} onPress={makeAccount}>
              Log in
          </Button>
          <Toast visible={showToast} message={toastMsg}/>
      </View>
    )
  }
}

export default Login