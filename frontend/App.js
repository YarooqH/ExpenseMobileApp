import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

// import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { AppContext } from './context';
// import store from './redux/store';

import Home from './screens/Home';
import AllAccounts from './screens/AllAccounts';
import History from './screens/History';
import Expense from './screens/Expense';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Income from './screens/Income';
import Transfer from './screens/Transfer';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { TabBarIndicator } from 'react-native-tab-view';

const queryClient = new QueryClient();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
      <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUp} />
      <Stack.Screen options={{ headerShown: false }} name='Dashboard' component={DrawerNavigation} />
    </Stack.Navigator>
  )
}

const TransactionTabs = ({navigation}) => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarLabelStyle: {color: '#1ba0a5', fontWeight: '600'},
        tabBarIndicatorStyle: {color: 'black', backgroundColor: '#1ba0a5'},
        tabBarIndicatorContainerStyle: {color: 'black', backgroundColor: 'black'}
        }}>
        <Tab.Screen name="Expense" component={Expense} />
        <Tab.Screen name="Income" component={Income} />
        <Tab.Screen name="Transfer" component={Transfer} />
      </Tab.Navigator>
    );
}

const DrawerNavigation = ({navigation}) => {
  return(
  <Drawer.Navigator screenOptions={{
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#1ba0a5',
    },
    headerTitleStyle: {
      color: 'black'
    },
drawerStyle: {
  backgroundColor: 'black',
  width: 250,
},
drawerLabelStyle:{
  color:'white'
}
}} initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="All Accounts" component={AllAccounts} />
    <Drawer.Screen name="History" component={History} />
    <Drawer.Screen name="Transactions" component={TransactionTabs} />
    <Drawer.Screen options={{ headerShown: false }} name="Logout" component={Login} />
    {/* <Drawer.Screen name="Expense" component={Expense} />
    <Drawer.Screen name="Income" component={Income} />
    <Drawer.Screen name="Transfer" component={Transfer} /> */}
    {/* <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="SignUp" component={SignUp} /> */}
  </Drawer.Navigator>
  )
}


const App = () => {
  const [_userEmail, setUserEmail ] = useState('');
  const [_userTransactions, setUserTransactions] = useState([]);
  const [_userCategories, setUserCategories] = useState();
  const [_userBanks, setUserBanks] = useState([]);
  const [_userBalance, setUserBalance] = useState(0);
  const sampleCats = ["Home", "Committee", "Car", "Job", "Allowances", "Fuel", "Repair","Maintenance", "Shopping", "Food and Drinks", "Gifts", "Utility Bills", "Mobile", "Family and Friends", "Miscellaneous"];
	
	const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'SET_USER_EMAIL':
				setUserEmail(payload.userEmail);
				return;
			case 'REMOVE_USER_EMAIL':
				setUserEmail('');
				return;
      case 'SET_USER_TRANSACTIONS':
        setUserTransactions(payload.userTransactions);
        return;
      case 'REMOVE_USER_TRANSACTIONS':
        setUserTransactions([]);
        return;
      case 'SET_USER_CATEGORIES':
        setUserCategories(payload.userCategories);
        return;
      case 'REMOVE_USER_CATEGORIES':
        setUserCategories();
        return;
      case 'SET_USER_BANKS':
        setUserBanks(payload.userBanks);
        return;
      case 'REMOVE_USER_BANKS':
        setUserBanks([]);
        return;
      case 'SET_USER_BALANCE':
        setUserBalance(payload.userBalance);
        return;
      case 'REMOVE_USER_BALANCE':
        setUserBalance(0);
        return;
			default:
				return;
		}
	};

  return (
    // <Provider store = {store}>
    <AppContext.Provider value={{_userEmail, _userBanks, _userCategories, _userTransactions, _userBalance, sampleCats, dispatchUserEvent}}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <NavigationContainer>
            {/* <DrawerNavigation /> */}
            <Navigation/>
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </AppContext.Provider>
      // </Provider>
  );
};

export default App;
