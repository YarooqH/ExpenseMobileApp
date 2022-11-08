import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

function Account() {
  return (
    <View style={{padding: 20, borderTopWidth: 0.5, borderColor: 'white'}}>
        {/* Some icon */}
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#1ba0a5', fontSize: 16, fontWeight: '600'}}>Cash</Text>
            <Text style={{color: 'white', fontWeight:'600'}}>PKR 1000</Text>
        </View>
    </View>
  )
}

export default Account