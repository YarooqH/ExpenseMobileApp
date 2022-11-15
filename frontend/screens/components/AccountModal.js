import React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Modal, Title, TextInput, Paragraph, Portal, IconButton, Provider, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from "react-query";

import AccountTile from './AccountTile';
import AddAccount from './AddAccount';
import BankAccountCard from './BankAccountCard';
import AddBankAccountBtn from './AddBankAccountBtn';
import { AppContext } from '../../context';

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

function AccountModal(props) {
  const [visible, setVisible] = useState(false);
  const [haveData, setHaveData] = useState(true);
  const [userBanks, setUserBanks] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userData, setUserData] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState();
  const [userBalance, setUserBalance] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const {_userTransactions, _userBanks, _userEmail, dispatchUserEvent} = useContext(AppContext);
  
  useEffect(() => {
    calculateBalance();
    setShowToast(false);
  }, [userBalance, haveData, accountName, userBanks]);
  
  let userBanksNew;
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const _setUserBalance = (balance) => {
    dispatchUserEvent("SET_USER_BALANCE", {userBalance: balance})
  }

  const _setUserBanks = (banks) => {
    dispatchUserEvent("SET_USER_BANKS", {userBanks: banks});
  }

  const calculateBalance = () => {
    let balance = 0;
    JSON.parse(_userBanks).map(bank => {
      balance += parseInt(bank.amount);
    });
    console.log(balance);
    _setUserBalance(balance);
    setUserBalance(balance);
  }

  const getUserAccounts = async (userData) => {
    try{
      // console.log('1st: ' + userData);
      const response = await fetch('http://192.168.18.94:3000/bankaccounts/'+userData);
      const data = JSON.stringify(await response.json());
      // console.log('userBanks: ' + data);
      // banks = data;
      // console.log(data);
      if(data){
        _setUserBanks(data);
        setUserBanks(data);
        setHaveData(true);
      }
      // console.log(data);
      // return response.json();
    } catch (e) {
      console.log(e)
    }
}

const checkIfAccountExists = (obj) => {
  let status = true;
  for (const bank of obj) {
    // console.log("name:" + bank.name);
    // console.log("newname:" + accountName);
    if(bank.name == accountName){
      status = false;
      break;
      // return status;
    }
  }
  return status;
}

  const makeAccount = async () => {
    console.log(accountName + ' : ' + accountBalance);
    // setHaveData(false);
    let check = checkIfAccountExists(JSON.parse(_userBanks));
    if(check){
      if(((accountName != '') && (accountBalance > 0))){
        console.log(accountName + ' : ' + parseInt(accountBalance) + " : " + _userEmail);
          try {
            const response = await fetch("http://192.168.18.94:3000/bankaccounts/", {
              headers: {
                  "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify({
                  "email": _userEmail,
                  "name": accountName,
                  "amount": parseInt(accountBalance)
              }),
          });
  
          const res = await response.json();
          if(res){
            getUserAccounts(_userEmail);
            calculateBalance();
            setUserBalance(parseInt(userBalance) + parseInt(accountBalance));
            // setHaveData(true);
            // calculateBalance();
          }
          // setAccountBalance('');
          // setAccountName('');
          console.log("Added");
        } catch (e) {
            return e;
        }
      } else {
        setToastMsg("Please Enter Proper Details")
        setShowToast(true);
        console.log('Error')
      }
    } else {
      setToastMsg('Account Already Exists!');
      setShowToast(true);
    }
  }

  if(haveData){
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
          <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR {userBalance}</Text>
            {/* <Title>Card title</Title> */}
          </Card.Content>
          <View style={{height: 100}}>
            <ScrollView horizontal={true}>
                {  
                // setTimeout(() => {
                    JSON.parse(_userBanks).map((bank, index) => {
                      return(
                        <BankAccountCard key={index} name={bank.name} amount={bank.amount} />
                      )
                      // console.log(bank.name);
                    })
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
          <Toast visible={showToast} message={toastMsg}/>
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
           <Button mode="contained-tonal" style={{marginTop: 5, backgroundColor: '#1ba0a5'}} onPress={() => (makeAccount(), setAccountBalance(''), setAccountName(''), hideModal())}>
                Add Bank Account
            </Button>
              </Modal>
            </Portal>
          {/* </View> */}
      </Provider>
      {/* </Provider> */}
      </View>
    )
  } else {
    return (
      <View style={{height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#1ba0a5" />
      </View>
    )
  }

}

export default AccountModal;