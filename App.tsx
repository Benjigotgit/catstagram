

import AppNavigation from './src/AppNavigation';
import React from 'react';
import { Provider } from "react-redux";
import configureStore from "./src/redux/Store";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PersistGate } from "redux-persist/integration/react";


const App = () => {

  return (
    <SafeAreaView style={styles.root}>
      <Provider store={configureStore().store}>
        <PersistGate loading={null} persistor={configureStore().persistor}>
          <AppNavigation/>
        </PersistGate>
      </Provider>
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
