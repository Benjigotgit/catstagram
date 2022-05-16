import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { CommentProps } from 'models'
import moment from 'moment'


export const Comment = (props: CommentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>{props.text}</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateCreatedText}>Date posted: {moment(props.timestamp_created).format('MMM-D-YYYY')}</Text>
        <Text style={styles.dateCreatedText}> at {moment(props.timestamp_created).format('H:ma')}</Text>
      </View>
      <View style={styles.bottomDivider}/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginBottom: 10,
    alignSelf: 'center'
  },
  bottomDivider: {
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#ddd'
  },
  dateCreatedText: {
    fontSize: 12, marginBottom: 3
  },
  commentText: {
    fontSize: 15
  },
  dateContainer: {
    flexDirection: 'row'
  }
})