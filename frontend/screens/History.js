import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import TransactionTile from './components/TransactionTile';

function History() {
  return (
    <View style={{height: '100%', backgroundColor: 'black', paddingTop: 10}}>
    <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
        <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'space-around'}}>Transactions</Text>
    </View>
    <SafeAreaView style={{ flex:1 }}>
      <ScrollView>
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
          <TransactionTile />
      </ScrollView>
    </SafeAreaView>
</View>
  )
}

export default History