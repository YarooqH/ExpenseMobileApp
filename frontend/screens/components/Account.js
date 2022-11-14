import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

function Account(props) {
  return (
    <View style={{padding: 20}}>
        {/* Some icon */}
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#1ba0a5', fontSize: 16, fontWeight: '600'}}>{props.name}</Text>
            <Text style={{color: 'white', fontWeight:'600'}}>PKR {props.amount}</Text>
        </View>
    </View>
  )
}

export default Account