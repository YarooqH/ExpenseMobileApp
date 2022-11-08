import React from 'react';
import {useState} from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';;

function AddTransaction() {
const [value, setValue] = useState('first');

  return (
    <View style={{height: 300, backgroundColor: '#1ba0a5'}}>
        <Chip onPress={() => console.log('Pressed')}>Expense</Chip>
        <Chip onPress={() => console.log('Pressed')}>Income</Chip>
        <Chip onPress={() => console.log('Pressed')}>Transfer</Chip>
    </View>
  )
}

export default AddTransaction