import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

function TransactionTile() {
  return (
    <View style={{padding: 20, borderTopWidth: 0.5, borderColor: 'white'}}>
        {/* Some icon */}
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#1ba0a5', fontSize: 16, fontWeight: '600'}}>Salary</Text>
            <Text style={{color: 'white', fontWeight:'600'}}>PKR 1000</Text>
        </View>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'grey'}}>Meezan Bank</Text>
            <Text style={{color: 'grey'}}>Dec 25 2022</Text>
        </View>
    </View>
  )
}

export default TransactionTile