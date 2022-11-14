import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BankAccountCard(props) {
  return (
    <Card style={{width: 100, borderWidth:1, borderRadius:5, borderColor:'#1ba0a5', marginTop:20, marginLeft: 20}}>
        <Card.Content>
        <Text style={{color: '#1ba0a5', fontSize: 12, fontWeight: "600"}}>{props.name}</Text>
        <Text style={{color: 'white', fontSize: 12}}>PKR {props.amount}</Text>
        </Card.Content>
    </Card>
  )
}

export default BankAccountCard