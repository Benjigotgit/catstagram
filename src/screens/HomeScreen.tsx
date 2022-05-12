import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {useState, useEffect} from 'react'
import React from 'react'
import { Post } from 'models'
import { HttpService, Apis } from 'services'


export const HomeScreen = (props: any) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  useEffect(()=> {
    
  }, [])

  const getPosts = async () => {
    setLoading(true)
    let data: Post[];
    try{
      console.log(Apis.POSTS)
      const resp = await HttpService.getInstance().get(Apis.POSTS)
      data = resp.data
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
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={getPosts}>
                      <Text>{'Hellos there'}</Text>

        </TouchableOpacity>
        <FlatList 
          data={posts}
          keyExtractor={item => item.pk.toString()}
          numColumns={3}
          style={styles.listStyles}
          renderItem={({item, index}) => 
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {console.log('its working')}}>
                      <Text>{item.pk}</Text>

        </TouchableOpacity>

        }
        />

        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listStyles:{
    
  },
  buttonStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'blue'
  }
})

