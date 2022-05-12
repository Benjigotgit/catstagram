import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export interface PostDetailsScreenProps {

}
export const PostDetailsScreen = (props: PostDetailsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>PostDetailsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

