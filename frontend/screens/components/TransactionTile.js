import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

function TransactionTile() {
  return (
    <View style={{}}>
        {/* Some icon */}
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <Text style={{color: 'black'}}>Salary</Text>
            <Text style={{color: 'black'}}>PKR 10008</Text>
        </View>
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <Text style={{color: 'black'}}>Meezan Bank</Text>
            <Text style={{color: 'black'}}>Dec 25 2022</Text>
        </View>
    </View>
  )
}

export default TransactionTile