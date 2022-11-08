import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import TransactionTile from './TransactionTile';

function TransactionHome() {
  return (
    <View>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400}}>
            <Text style={{display: 'flex', color: 'black', fontSize: 32, justifyContent:'center'}}>Transactions</Text>
            <TouchableOpacity>
                <Text style={{color: 'black', paddingTop: 15}}>VIEW ALL</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <TransactionTile />
        </ScrollView>
    </View>
  )
}

export default TransactionHome