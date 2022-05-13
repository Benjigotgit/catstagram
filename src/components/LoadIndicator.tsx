import {Modal, View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';


export const LoadIndicator = () => {
  const loadingSpinner = useSelector(
    (state: any) => state.persistedReducer.loadingSpinner,
  );

  return (
    <Modal visible={loadingSpinner.loading} transparent={true}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <ActivityIndicator size="large" color="red" />
          {loadingSpinner.message ? (
            <Text style={styles.msgMargin}>{loadingSpinner.message}</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  msgMargin: {marginLeft: 10},
  view1: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  view2: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
});
