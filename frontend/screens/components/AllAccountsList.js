import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Account from './Account';

function AllAccountsList() {
  return (
    <View style={{backgroundColor: 'black', paddingTop: 10, height: '100%'}}>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
            <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'center'}}>Your Accounts</Text>
        </View>
        <SafeAreaView style={{ flex:1 }}>
          <ScrollView>
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
          </ScrollView>
        </SafeAreaView>
    </View>    
  )
}

export default AllAccountsList