import React, {useState} from 'react';
import { TextInput } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

function Expense() {
    const [value, setValue] = useState();
  return (
    <View style={{backgroundColor: 'black', height: '100%', display: 'flex', alignItems: 'center', paddingTop: 10}}>
        <TextInput
            label="Enter Amount"
            placeholder="PKR 10000"
            textColor='white'
            style={{backgroundColor: 'black', width: 300}}
        />
        {/* <View style={{alignItems:'flex-end'}}> */}
            <Text variant="displaySmall" style={{paddingTop: 30}}>Categories</Text>
        {/* </View> */}
        <View style={{display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'row'}}>
            <ToggleButton.Group
        onValueChange={value => setValue(value)}
        value={value}>
                <ToggleButton icon="format-align-left" value="left" />
                <ToggleButton icon="format-align-right" value="right" />
            </ToggleButton.Group>
        </View>

    </View>
  )
}

export default Expense