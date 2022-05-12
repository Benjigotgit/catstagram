import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export interface HomeScreenProps {

}

export const HomeScreen = (props: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

