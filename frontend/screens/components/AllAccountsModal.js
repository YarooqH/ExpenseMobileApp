import React, {useState, useContext} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Modal, Portal } from 'react-native-paper';

import { AppContext } from '../../context';

import AllAccountsList from './AllAccountsList';

function AllAccountsModal(props) {
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {_userBalance} = useContext(AppContext);


  return (
    <View>
    <Card>
      <Card.Content>
      <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{color: 'white', fontSize: 20}}>What You Have</Text>
      </View>
      <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR {_userBalance}</Text>
      </Card.Content>
    </Card>
    <View>
        <AllAccountsList />
    </View>
  </View>
  )
}

export default AllAccountsModal