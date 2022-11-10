import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Icon } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';


function AddBankAccountBtn() {
  return (
    <Card style={{width: 100, borderWidth:1, borderRadius:5, borderColor:'#1ba0a5', marginTop:20, marginLeft: 20}}>
        <Card.Content>
        <IconButton
                icon="plus"
                iconColor={"white"}
                size={30}
                style={{paddingBottom: 30, paddingRight: 20, width: '100%', height: '100%'}}
                onPress={() => console.log('Pressed')}
            />
        </Card.Content>
    </Card>
  )
}

export default AddBankAccountBtn