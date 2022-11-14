import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import TransactionTile from './TransactionTile';

function TransactionHome(props) {
  return (
    <View style={{marginTop: 120, backgroundColor: 'black', paddingTop: 10}}>
        <View style={{display: 'flex',flexDirection: 'row' , justifyContent: 'space-around', width: 400, marginBottom: 20}}>
            <Text style={{display: 'flex', color: 'white', fontSize: 32, justifyContent:'center'}}>Transactions</Text>
            <TouchableOpacity onPress={() => {props.nav.navigate('History')}}>
                <Text style={{color: 'white', paddingTop: 15}}>VIEW ALL</Text>
            </TouchableOpacity>
        </View>
        <SafeAreaView style={{ flex:1, paddingBottom: 300}}>
          <ScrollView>
            {props.transactions.length > 0 ? props.transactions.map((t, index) => {
              return(
                <TransactionTile key={index} type={t.type} category={t.category} amount={t.amount} from={t.from} date={t.date} />
              );
            }) : <Text style={{paddingTop: 150, color: 'grey', fontSize: 20, fontWeight: "600", textAlign: 'center'}}>No Transactions Made Yet</Text>}
          </ScrollView>
        </SafeAreaView>
    </View>
  )
}

export default TransactionHome