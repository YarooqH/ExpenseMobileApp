import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import {FAB, Modal, Portal} from 'react-native-paper';
import About from './AllAccounts';
import AccountModal from './components/AccountModal';
import TransactionHome from './components/TransactionHome';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../redux/actions/countAction';

function Home({ navigation }) {
  // const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userBanks, setUserBanks] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getUser();
    getUserData();
  }, [])

  const getUser = async() => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    console.log(userData);
  }

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
      setIsLoading(false);
      // getUser
      // getUserAccounts(userdata);
      
    } catch(e) {
      return e;
    }
  }

  if(isLoading) {
    return (
      <View style={{backgroundColor: '#1ba0a5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <AccountModal nav={navigation}/>
        <TransactionHome nav={navigation}/>
        <FAB
        label="New Transaction"
          style={{position: 'absolute', backgroundColor: '#1ba0a5',
          bottom: '20%', right: 10}}
          onPress={() => navigation.navigate('Transactions')}
        />
    </View>
    )
  } else {
    return (
      <View style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 26, color: 'white'}}>Loading....</Text>
      </View>
    )
  }
  
    // const dispatch = useDispatch();
  return (
    <View style={{backgroundColor: '#1ba0a5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <AccountModal nav={navigation}/>
        <TransactionHome nav={navigation}/>
        <FAB
        label="New Transaction"
          style={{position: 'absolute', backgroundColor: '#1ba0a5',
          bottom: '20%', right: 10}}
          onPress={() => navigation.navigate('Transactions')}
        />
    </View>
  )
}

export default Home;