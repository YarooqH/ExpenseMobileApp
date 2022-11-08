import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

function About({ navigation }) {
  return (
    <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
        </TouchableOpacity>
        <Text>Supp Dude</Text>
    </View>
  )
}

export default About;