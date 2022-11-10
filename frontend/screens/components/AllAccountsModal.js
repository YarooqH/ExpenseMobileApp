import React, {useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Modal, Portal } from 'react-native-paper';

import AllAccountsList from './AllAccountsList';

function AllAccountsModal(props) {
    const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    <Card>
      <Card.Content>
      <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{color: 'white', fontSize: 20}}>What You Have</Text>
      </View>
      <Text style={{color: '#1ba0a5', fontSize: 32}}>PKR 10000</Text>
        {/* <Title>Card title</Title> */}
      </Card.Content>
    </Card>
    <View>
        <AllAccountsList />
    </View>
  </View>
  )
}

export default AllAccountsModal