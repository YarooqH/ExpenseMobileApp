import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import About from './About';
import AccountModal from './components/AccountModal';
import TransactionHome from './components/TransactionHome';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/actions/countAction';

function Home({ navigation }) {
    const dispatch = useDispatch();
  return (
    <View style={{backgroundColor: '#1ba0a5', height:100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <AccountModal />
        {/* <Text style={{color: 'black'}}>Holmes Page</Text>
        <TouchableOpacity style={{margin: 5}} onPress={() => (navigation.toggleDrawer())}>
            <Text style={{fontSize:25 ,color: 'black', borderColor: 'black', padding: 10, borderWidth: 3}}>Open Drawer</Text>
        </TouchableOpacity> */}
        <TransactionHome />
    </View>
  )
}

export default Home;