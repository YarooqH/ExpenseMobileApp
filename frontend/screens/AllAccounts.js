import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import AllAccountsModal from './components/AllAccountsModal';

function AllAccounts({ navigation }) {
  return (
    <View style={{height:'100%', backgroundColor: 'black'}}>
      {/* <Text>Hello</Text>         */}
      <AllAccountsModal />
    </View>
  )
}

export default AllAccounts;