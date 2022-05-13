import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import React from 'react'
import { Post, PostDetailsScreenProps } from 'models'
import { HttpService, BASE_URL_IMAGE, Apis } from 'services'
import { FeedPost } from 'components'
import { AxiosError } from 'axios'
import { LoadIndicator } from 'components/LoadIndicator'



export const HomeScreen = (props: any) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)
    let data: Post[] = [];
    try{
      const resp = await HttpService.getInstance().get(Apis.POSTS)
      data = resp.data
      console.log('RESPONSE getPosts() ===> ', JSON.stringify(data))
      setHasError(false)
    } catch (e){
      console.error('ERROR getPosts ', e)
      data = []
      setHasError(true)
    }
    setPosts(data)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <LoadIndicator/>
        <FlatList 
          data={posts}
          keyExtractor={item => item.pk.toString()}
          numColumns={3}
          // initialNumToRender={21}
          style={styles.listStyles}
          renderItem={({item, index}) => <FeedPost {...item}/>}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listStyles:{
    marginHorizontal: 2.5
  },
  buttonStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'blue'
  }
})