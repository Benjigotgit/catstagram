

import AppNavigation from './src/AppNavigation';
import React from 'react';
// import { TabNavigator } from './src/AppNavigation';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';

const App = () => {

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <AppNavigation/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  button: {
    backgroundColor: 'blue',
    height: 50,
    width: 50,

  }
})
export default App;
