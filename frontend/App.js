import 'react-native-gesture-handler';
import React from 'react';
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
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


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
        tabBarStyle: { backgroundColor: '#1ba0a5' },
        tabBarLabelStyle: {color: 'white'}
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
  return (
    // <Provider store = {store}>
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          {/* <DrawerNavigation /> */}
          <Navigation/>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
    // </Provider>
  );
};

export default App;
