import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

function TransactionTile(props) {
  return (
    <View style={{padding: 20}}>
        {/* Some icon */}
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>{props.category}</Text>
            {
              props.type=="income" ? <Text style={{color: '#21c5cb', fontWeight:'600'}}>PKR {props.amount}</Text> : <Text style={{color: '#e1321f', fontWeight:'600'}}>PKR {props.amount}</Text>
            }
            {/* <Text style={{color: 'white', fontWeight:'600'}}>PKR {props.amount}</Text> */}
        </View>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'grey'}}>{props.from}</Text>
            <Text style={{color: 'grey'}}>{props.date}</Text>
        </View>
    </View>
  )
}

export default TransactionTile