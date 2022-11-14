import React, {useState, useContext, useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, ToastAndroid, TouchableOpacity, FlatList, ScrollView } from 'react-native';
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

function Transfer() {
    const {_userCategories, _userBanks, sampleCats, _userEmail, dispatchUserEvent} = useContext(AppContext);
    const [category, setCategory] = useState();
    const [bankAccount, setBankAccount] = useState();
    const [amount, setAmount] = useState(0);
    const [value, setValue] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('Invalid Input');
    const [haveData, setHaveData] = useState(false);

    useEffect(() => {
        getUserTransactions(_userEmail);
        // setHaveData(!showToast);
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
            _setUserBanks(data);
            setHaveData(true);
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
    
        // console.log(newdate);
        try{
            const response = await fetch("http://192.168.18.94:3000/transactions", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "email": _userEmail,
                "category": "Transfer",
                "date": newdate,
                "type": "income",
                "amount": parseInt(amount),
                "from": to
            }),
        }
        );
        const res = await response.json();
    
        console.log("transaction made");
        } catch(e) {
            console.log(e);
        }
    }
    
    const addTransaction1 = async () => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
    
        let newdate = JSON.stringify(day + "/" + month + "/" + year);
    
        // console.log(newdate);
        if((typeof(parseInt(amount)) == "number") && (parseInt(amount) > 0)){
            // if(from != to){
                try{
                    const response = await fetch("http://192.168.18.94:3000/transactions", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "email": _userEmail,
                        "category": "Transfer",
                        "date": newdate,
                        "type": "expense",
                        "amount": parseInt(amount),
                        "from": from
                    }),
                }
                );
                const res = await response.json();
                if(res){
                    changeAmount();
                    // setAmount(0);
                    addTransaction();
                    // getUserBanks(_userEmail);
                    // getUserTransactions(_userEmail);
                    // setToastMsg('Transaction Made');
                    // setShowToast(true);
                }
            
                console.log("transaction made");
                } catch(e) {
                    console.log(e);
                }

            // } else {
            //     setToastMsg('Cant transfer to the Same Account');
            //     setShowToast(true);
            // }
        } else {
            setToastMsg('Invalid Input');
            setShowToast(true);
        }
    }

    const changeAmount = async () => {
        for (const bank of JSON.parse(_userBanks)) {
            if (bank.name == from) {
                if (parseInt(bank.amount) >= parseInt(amount)){
                    try{
                        const response = await fetch("http://192.168.18.94:3000/bankaccounts/expense/"+_userEmail, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                            "name": from,
                            "amount": parseInt(amount),
                        }),
                    }
                    );
                    const res = await response.json();
                    if(res){
                        // changeToAmount();
                        // setHaveData(true);
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
        try{
            console.log("to: "+ to);
            const response = await fetch("http://192.168.18.94:3000/bankaccounts/income/"+_userEmail, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                "name": to,
                "amount": parseInt(amount),
            }),
        }
        );
        const res = await response.json();
        if(res){
            setHaveData(true);
            getUserBanks(_userEmail);
            getUserTransactions(_userEmail);
            setToastMsg('Transaction Made');
            setShowToast(true);
            console.log("transaction added");
        }
        } catch(e) {
            console.log(e);
        }  
    } 

    const changeFromAmount = async () => {
        try{
            const response = await fetch("http://192.168.18.94:3000/transactions/expense/"+_userEmail, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                "name": from,
                "amount": parseInt(amount),
            }),
        }
        );
        const res = await response.json();
        console.log("transaction added");
        } catch(e) {
            console.log(e);
        }  
    } 


    const changeToAmount = async () => {
        try{
            console.log("to: "+ to);
            const response = await fetch("http://192.168.18.94:3000/transactions/income/"+_userEmail, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                "name": to,
                "amount": parseInt(amount),
            }),
        }
        );
        const res = await response.json();
        if(res){
            console.log("transaction added");
        }
        } catch(e) {
            console.log(e);
        }  
    } 

    const onBtnPress = () => {
        if(to != from) {
            addTransaction1();
        } else {
            setToastMsg('Cant Transfer to the Same Account');
            setShowToast(true);
        }
        // changeAmount();
    }

  return (
    <View style={{backgroundColor: 'black', height: '100%', paddingTop: 10, display: 'flex', alignItems:'center'}}>
        <TextInput
            label="Enter Amount"
            placeholder="PKR 10000"
            textColor='white'
            onChangeText={(text) => setAmount(text)}
            activeUnderlineColor='#1ba0a5'
            style={{backgroundColor: 'black', width: 300}}
        />
        <Text variant="displaySmall" style={{paddingTop: 10}}>Pay From</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, height: 190, width: '100%', padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setFrom(newValue)} value={from}>
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
                            {/* <Text>{bank.name}</Text> */}
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
        <Text variant="displaySmall" style={{paddingTop: 10}}>Pay To</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, height: 200, width: '100%', padding: 10}}>
            <RadioButton.Group onValueChange={newValue => setTo(newValue)} value={to}>
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
                            {/* <Text>{bank.name}</Text> */}
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
        <Button mode="contained-tonal" style={{marginTop: 20, backgroundColor: '#1ba0a5', padding: 10, width: 300}} onPress={onBtnPress}>
            Add Transaction
        </Button>
        <Toast visible={showToast} message={toastMsg}/>
    </View>
  )
}

export default Transfer