import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AppContext } from '../../context';

import Account from './Account';

function AllAccountsList() {
  const [banks, setBanks] = useState();
  const {_userBanks} = useContext(AppContext);

  useEffect(() => {

  }, [setBanks]);

  return (
    <View style={{backgroundColor: 'black', paddingTop: 10, height: '88%'}}>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
            <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'center'}}>Your Accounts</Text>
        </View>
        <View>
          <ScrollView>
            {
                JSON.parse(_userBanks).map((bank, index) => {
                  return(
                    <Account key={index} name={bank.name} amount={bank.amount} />
                  )
                })
            }
          </ScrollView>
          {/* <Button mode="contained-tonal" style={{backgroundColor: 'black'}} onPress={() => showModal}>
            Add Account
        </Button> */}
        </View>
    </View>    
  )
}

export default AllAccountsList