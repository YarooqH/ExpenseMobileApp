import { createDrawerNavigator } from "react-navigation-drawer";
import {createAppContainer} from '@react-navigation/native';
import About from '../screens/About';
import Home from '../screens/Home';

import React from 'react'

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },

    About: {
        screen: About,
    },
});

export default createAppContainer(RootDrawerNavigator);

// export default drawer