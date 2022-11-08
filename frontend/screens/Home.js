import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import About from './AllAccounts';
import AccountModal from './components/AccountModal';
import TransactionHome from './components/TransactionHome';

// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../redux/actions/countAction';

function Home({ navigation }) {
    // const dispatch = useDispatch();
  return (
    <View style={{backgroundColor: '#1ba0a5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <AccountModal />
        <TransactionHome />
    </View>
  )
}

export default Home;