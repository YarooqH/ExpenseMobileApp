import React,{useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Modal, Title, TextInput, Paragraph, Portal, IconButton, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from "react-query";

import AccountTile from './AccountTile';
import AddAccount from './AddAccount';
import BankAccountCard from './BankAccountCard';
import AddBankAccountBtn from './AddBankAccountBtn';

function AccountModal(props) {
  const [visible, setVisible] = useState(false);
  const [haveData, setHaveData] = useState(false);
  const [userBanks, setUserBanks] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userData, setUserData] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState();
  
  useEffect(() => {
    getUserData();
  }, [haveData]);
  
  let userBanksNew;
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  // const getUserAccounts = async (userData) => {
  //     try{
  //       const response = await fetch('http://192.168.18.94:3000/bankaccounts/'+userData);
  //       const data = await response.json();
  //       userBanksNew = data;
  //       setUserBanks(data);
  //       setHaveData(true);
  //       console.log(data);
  //       return response.json();
  //     } catch (e) {
  //       console.log(e)
  //     }
  // }

  const getUserData = async () => {
    try {
      const userdata = JSON.parse(await AsyncStorage.getItem("user"));
      const userAccounts = JSON.parse(await AsyncStorage.getItem("userAccounts"));
      const userTransactions = JSON.parse(await AsyncStorage.getItem("userTransactions"));
      
      console.log(userdata);
      console.log(userAccounts);
      console.log(userTransactions);

      setUserData(userdata);
      setUserBanks(userAccounts);
      setUserTransactions(userTransactions);
      
      setHaveData(true);
      // getUser
      // getUserAccounts(userdata);
      
    } catch(e) {
      return e;
    }
    // console.log(userData);
  }
  
  const makeAccount = () => {
    if(accountName != '' && accountBalance != ''){

        try {
          axios.post('http://192.168.18.94:3000/transactions/', {
            "email": userData,
            "name": accountName,
            "amount": accountBalance
          })
          .then(function (response) {
            // let banksAdded = createBankAccounts();
            // console.log(banksAdded);
            // if(banksAdded){
              // console.log(response);
              // setEmail('')
              // setPassword('')
              // setConfirmPassword('')
              setAccountBalance('');
              setAccountName('');
    
            // } else{ 
              // return 'error with adding banks'
            // }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
          return e;
      }
    } else {
      console.log('Error')
    }

  }
  
  // setTimeout(() => {
    // const { data, status } = useQuery("userBanks", getUser);
  // }, 50);
  
  return (
    <View style={{height:300, width: 400, padding: 6, backgroundColor: '#1ba0a5', paddingTop: 200}}> 
      <Card style={{paddingBottom: 20}}>
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        <Card.Content>
        <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{color: 'white', fontSize: 20}}>What You Have</Text>
            <TouchableOpacity onPress={() => {props.nav.navigate('All Accounts')}}>
                <Text style={{color: 'white', borderColor: '#1ba0a5', borderWidth: 2, padding: 8, borderRadius: 10}}>All Accounts</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR 10000</Text>
          {/* <Title>Card title</Title> */}
        </Card.Content>
        <View style={{height: 100}}>
          <ScrollView horizontal={true}>
              {  
              // setTimeout(() => {
                  
                  // }, 200)
              }
            <Card style={{width: 100, borderWidth:1, borderRadius:5, borderColor:'#1ba0a5', marginTop:20, marginLeft: 20}}>
              <Card.Content>
              <IconButton
                      icon="plus"
                      iconColor={"white"}
                      size={30}
                      style={{paddingBottom: 30, paddingRight: 20, width: '100%', height: '100%'}}
                      onPress={showModal}
                  />
                </Card.Content>
              </Card>
          </ScrollView>
        </View>
  </Card>
        {/* <View style={{display: 'flex', gap: 5,flexDirection: 'column'}}>
            <Text style={{color: 'black'}}>What You Have</Text>
            <TouchableOpacity>
                <Text style={{color: 'black'}}>All Accounts</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}>PKR 20000</Text>
        <View>
            <AccountTile/>
            <AddAccount/>
        </View> */}

    <Provider>
        {/* <View> */}
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: '#1e1f22', borderWidth: 1, borderColor: '#1ba0a5', padding: 20, height: 250, width: '80%', top: '45%', borderRadius:10, alignSelf:'center', justifyContent:'center', position: 'absolute'}}>
              <Text style={{fontSize: 20}}>Add Bank Account</Text>
              <TextInput
            label="Enter Bank Name"
            // placeholder="Enter Email"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            onChangeText={text => setAccountName(text)}
            style={{height: 50,marginTop: 10, marginBottom: 10, fontSize: 10 }}
        />
              <TextInput
            label="Enter Amount"
            // placeholder="Enter Email"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            onChangeText={num => setAccountBalance(num)}
            style={{height: 50,marginTop: 10, marginBottom: 10, fontSize: 10 }}
        />
         <Button mode="contained-tonal" style={{marginTop: 5, backgroundColor: '#1ba0a5'}} onPress={() => makeAccount()}>
              Add Bank Account
          </Button>
            </Modal>
          </Portal>
        {/* </View> */}
    </Provider>
    {/* </Provider> */}
    </View>
  )
}

export default AccountModal;