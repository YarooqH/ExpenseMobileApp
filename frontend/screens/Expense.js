import React, {useState, useEffect, useContext} from 'react';
import { TextInput } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, ToastAndroid, FlatList, ScrollView } from 'react-native';
import { Text, RadioButton, Button } from 'react-native-paper';
import {AppContext} from '../context';

const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    
      // setShowToast(false);
      
      return null;
    }
    return null;
  };


function Expense({navigation}) {
    const [value, setValue] = useState();
    const {_userCategories, _userBanks, sampleCats, _userEmail, dispatchUserEvent} = useContext(AppContext);
        // const [value, setValue] = useState();
    const [category, setCategory] = useState();
    const [bankAccount, setBankAccount] = useState();
    const [amount, setAmount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('Invalid Input');
    const [haveData, setHaveData] = useState(false);

    useEffect(() => {
        getUserTransactions(_userEmail);
        // setHaveData(false);
        // changeAmount();
        setShowToast(false);
    }, [haveData, showToast]);

    const _setUserTransactions = (transactions) => {
        dispatchUserEvent("SET_USER_TRANSACTIONS", {userTransactions: transactions} )
    }

    const _setUserBanks = (banks) => {
        dispatchUserEvent("SET_USER_BANKS", {userBanks: banks})
    }

    const getUserTransactions = async(userData) => {
        try{
          const response = await fetch('http://192.168.18.94:3000/transactions/'+userData)
          const data = JSON.stringify(await response.json());
            // const data = response;
            // transactions = data;
          _setUserTransactions(data);
            // console.log(data);
            // return response.json();
        } catch(e) {
          console.log(e)
        }
    }

    const getUserBanks = async (userData) => {
        try{
            const response = await fetch('http://192.168.18.94:3000/bankaccounts/'+userData)
            const data = JSON.stringify(await response.json());
              // const data = response;
              // transactions = data;
            _setUserBanks(data);
            setHaveData(true);
              // console.log(data);
              // return response.json();
          } catch(e) {
            console.log(e)
          }
    }
      

    const addTransaction = async () => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = JSON.stringify(day + "/" + month + "/" + year);

        console.log(newdate);
        if((typeof(parseInt(amount)) == "number") && (parseInt(amount) > 0)){
            try{
                const response = await fetch("http://192.168.18.94:3000/transactions", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "email": _userEmail,
                    "category": category,
                    "date": newdate,
                    "type": "expense",
                    "amount": parseInt(amount),
                    "from": bankAccount
                }),
            }
            );
            const res = await response.json();
    
            console.log("transaction made", res);
    
            if(res) {
                changeAmount();
                // setAmount(0);
                // getUserBanks(_userEmail);
                // getUserTransactions(_userEmail);
                setToastMsg('Transaction Made');
                setShowToast(true);
            }
            } catch(e) {
                console.log(e);
            }
        } else {
            setToastMsg('Invalid Input');
            setShowToast(true);
        }
}

const changeAmount = async () => {
    // console.log( typeof _userEmail + " " + typeof bankAccount + " " + typeof amount);
    // console.log(JSON.parse(_userBanks))

    for (const bank of JSON.parse(_userBanks)) {
        // console.log(bank)
        // console.log("bank: " + bank.name);
        // console.log("newBank: " + (bankAccount));
        // console.log("amount: " + bank.amount);
        // console.log("newAmount: " + (amount));
        if (bank.name == bankAccount) {
            if (parseInt(bank.amount) >= parseInt(amount)){
                try{
                    const response = await fetch("http://192.168.18.94:3000/bankaccounts/expense/"+_userEmail, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        "name": bankAccount,
                        "amount": parseInt(amount),
                    }),
                }
                );
                const res = await response.json();
                if(res){
                    getUserBanks(_userEmail);
                    getUserTransactions(_userEmail);
                    setHaveData(true);
                    console.log("transaction added", res);
                }
                } catch(e) {
                    console.log("caught here" + e);
                }  
            } else if (parseInt(bank.amount) < parseInt(amount)){
                setToastMsg("Invalid Amount")
                setShowToast(true);
            }
        }
    }
} 
return (
    <View style={{backgroundColor: 'black', height: '100%', paddingTop: 10, display: 'flex', alignItems:'center'}}>
        <TextInput
            label="Enter Amount"
            placeholder="PKR 10000"
            textColor='white'
            activeUnderlineColor='#1ba0a5'
            onChangeText={(text) => setAmount(text)}
            style={{backgroundColor: 'black', width: 300}}
        />
        <Text variant="displaySmall" style={{paddingTop: 10}}>Categories</Text>
        <View style={{display: 'flex', flex:1, width: '100%', flexGrow: 1, flexDirection: 'row', marginTop: 20, height: 190, padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
            <ScrollView style={{width: '100%', flex: 1}}>
                {
                    // console.log(_userCategories)
                    sampleCats.map((cat, index) => {
                        return(
                            <View key={index} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                <RadioButton value={cat} color={'#1ba0a5'} />
                                <View style={{width: '90%'}}>
                                    <Text>{cat}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            {/* <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="first" />
                <Text>First</Text>
            </View> */}
            {/* <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                <RadioButton value="second" />
                <Text>Second</Text>
            </View> */}
            </ScrollView>
            </RadioButton.Group>
        </View>
        <Text variant="displaySmall" style={{paddingTop: 10}}>Accounts</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, height: 200, width: '100%', padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setBankAccount(newValue)} value={bankAccount}>
            <ScrollView>
                {
                    JSON.parse(_userBanks).map((bank, index) => {
                        return(
                        <View key={index} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                            <RadioButton value={bank.name} color={'#1ba0a5'} />
                            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection:'row', width: '90%'}}>
                                <Text>{bank.name}</Text>
                                <Text style={{textAlign: 'right', fontWeight: '700'}}>{bank.amount}</Text>
                            </View>
                        </View>
                        )
                    })
                }
                {/* <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                    <RadioButton value="first" />
                    <Text>First</Text>
                </View>
                <View style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                    <RadioButton value="second" />
                    <Text>Second</Text>
                </View> */}
            </ScrollView>
            </RadioButton.Group>
        </View>
        <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5', padding: 10, width: 300}} onPress={addTransaction}>
            Add Transaction
        </Button>
        <Toast visible={showToast} message={toastMsg}/>
    </View>
  )
}

export default Expense