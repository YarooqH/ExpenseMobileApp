import React, {useState} from 'react';
import { TextInput } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Text, RadioButton, Button } from 'react-native-paper';

function Expense({navigation}) {
    const [value, setValue] = useState();
  return (
    <View style={{backgroundColor: 'black', height: '100%', paddingTop: 10, display: 'flex', alignItems:'center'}}>
        <TextInput
            label="Enter Amount"
            placeholder="PKR 10000"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            style={{backgroundColor: 'black', width: 300}}
        />
        <Text variant="displaySmall" style={{paddingTop: 30}}>Categories</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, height: 150, width: '100%', padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <ScrollView>
            <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="first" />
                <Text>First</Text>
            </View>
            <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="second" />
                <Text>Second</Text>
            </View>
            </ScrollView>
            </RadioButton.Group>
        </View>
        <Text variant="displaySmall" style={{paddingTop: 30}}>Accounts</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, height: 200, width: '100%', padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <ScrollView>
            <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="first" />
                <Text>First</Text>
            </View>
            <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="second" />
                <Text>Second</Text>
            </View>
            </ScrollView>
            </RadioButton.Group>
        </View>
        <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5', padding: 10, width: 300}} onPress={() => console.log('Pressed')}>
            Add Transaction
        </Button>
    </View>
  )
}

export default Expense