import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

import AccountTile from './AccountTile';
import AddAccount from './AddAccount';

function AccountModal() {
  return (
    <View style={{height:400, width: 400, padding: 10, backgroundColor: 'white'}}>
        <View style={{display: 'flex', gap: 5,flexDirection: 'column'}}>
            <Text style={{color: 'black'}}>What You Have</Text>
            <TouchableOpacity>
                <Text style={{color: 'black'}}>All Accounts</Text>
            </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}>PKR 20000</Text>
        <View>
            <AccountTile/>
            <AddAccount/>
        </View>
    </View>
  )
}

export default AccountModal;