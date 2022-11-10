import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Account from './Account';

function AllAccountsList() {
  return (
    <View style={{backgroundColor: 'black', paddingTop: 10, height: 300}}>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
            <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'center'}}>Your Accounts</Text>
        </View>
        <View>
          <ScrollView style={{flex: 1}}>
            <Account />
          </ScrollView>
          {/* <Button mode="contained-tonal" style={{backgroundColor: 'black'}} onPress={() => showModal}>
            Add Account
        </Button> */}
        </View>
    </View>    
  )
}

export default AllAccountsList