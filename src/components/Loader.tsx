import {Modal, View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export const Loader = (props) => {
  const loading = useSelector(
    (state) => state.reducer.appLoading,
  );


  return (
    <Modal visible={loading.loading} transparent={true}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <ActivityIndicator size="large" color="red" />
          {loading.message ? (
            <Text style={styles.msgMargin}>{loading.message}</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  msgMargin: {marginLeft: 10,
  color:'#000000'},
  view1: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  view2: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#c3c3c340',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
});
