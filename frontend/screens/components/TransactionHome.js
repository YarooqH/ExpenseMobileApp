import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import TransactionTile from './TransactionTile';

function TransactionHome() {
  return (
    <View style={{marginTop: 120, backgroundColor: 'black', paddingTop: 10}}>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
            <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'center'}}>Transactions</Text>
            <TouchableOpacity>
                <Text style={{color: 'white', paddingTop: 15}}>VIEW ALL</Text>
            </TouchableOpacity>
        </View>
        <SafeAreaView style={{ flex:1, paddingBottom: 300}}>
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

export default TransactionHome