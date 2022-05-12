

import AppNavigation from './src/AppNavigation';
import React from 'react';
// import { TabNavigator } from './src/AppNavigation';
import { SafeAreaView, StyleSheet } from 'react-native';

const App = () => {

  return (
    <SafeAreaView style={styles.root}>
      <AppNavigation/>
      {/* <TabNavigator/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
export default App;
