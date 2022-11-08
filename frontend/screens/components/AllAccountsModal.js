import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import AllAccountsList from './AllAccountsList';

function AllAccountsModal() {
  return (
    <View style={{}}>
    <Card style={{}}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
      <Card.Content>
      <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{color: 'white', fontSize: 20}}>What You Have</Text>
      </View>
      <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR 10000</Text>
        {/* <Title>Card title</Title> */}
      </Card.Content>
    </Card>
    <View>
        <AllAccountsList />
    </View>
  </View>
  )
}

export default AllAccountsModal