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
import { store } from './redux/store';

import Home from './screens/Home';
import About from './screens/About';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store = {store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#1ba0a5',
            },
            headerTitleStyle: {
              color: 'white'
            },
        drawerStyle: {
          backgroundColor: 'white',
          width: 250
        },
      }} initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
