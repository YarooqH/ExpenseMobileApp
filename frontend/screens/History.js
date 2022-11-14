import React, {useContext} from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import TransactionTile from './components/TransactionTile';
import { AppContext } from '../context';

function History() {
  const {_userTransactions} = useContext(AppContext);

  return (
    <View style={{height: '100%', backgroundColor: 'black', paddingTop: 10}}>
    <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
        <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'space-around'}}>Transactions</Text>
    </View>
    <SafeAreaView style={{ flex:1 }}>
      <ScrollView>
      {_userTransactions.length > 0 ? JSON.parse(_userTransactions).map((t, index) => {
              return(
                <TransactionTile key={index} type={t.type} category={t.category} amount={t.amount} from={t.from} date={t.date} />
              );
            }) : <Text style={{paddingTop: 150, color: 'grey', fontSize: 20, fontWeight: "600", textAlign: 'center'}}>No Transactions Made Yet</Text>}
      </ScrollView>
    </SafeAreaView>
</View>
  )
}

export default History