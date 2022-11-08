import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import AccountTile from './AccountTile';
import AddAccount from './AddAccount';

function AccountModal() {
  return (
    <View style={{height:300, width: 400, padding: 6, backgroundColor: '#1ba0a5', paddingTop: 200}}>
      <Card style={{paddingBottom: 20}}>
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        <Card.Content>
        <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{color: 'white', fontSize: 20}}>What You Have</Text>
            <TouchableOpacity>
                <Text style={{color: 'white', borderColor: '#1ba0a5', borderWidth: 2, padding: 8, borderRadius: 10}}>All Accounts</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR 10000</Text>
          {/* <Title>Card title</Title> */}
        </Card.Content>
        <View>
          <Card style={{width: 100, borderWidth:1, borderRadius:5, borderColor:'#1ba0a5', marginTop:20, marginLeft: 20}}>
            <Card.Content>
              <Text style={{color: '#1ba0a5'}}>Cash</Text>
              <Text style={{color: 'white'}}>PKR 1000</Text>
            </Card.Content>
          </Card>
        </View>
  </Card>
        {/* <View style={{display: 'flex', gap: 5,flexDirection: 'column'}}>
            <Text style={{color: 'black'}}>What You Have</Text>
            <TouchableOpacity>
                <Text style={{color: 'black'}}>All Accounts</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}>PKR 20000</Text>
        <View>
            <AccountTile/>
            <AddAccount/>
        </View> */}
    </View>
  )
}

export default AccountModal;