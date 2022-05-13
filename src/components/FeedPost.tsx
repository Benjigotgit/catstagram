import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BASE_URL_IMAGE } from 'services'
import { Post } from 'models'
import { SCREEN_WIDTH } from 'constants/AppContants'


export const FeedPost = (props: Post) => {
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    
    (async function() { //checks if post image returns status 200
      const image = await fetch(BASE_URL_IMAGE+props.image)
      .then((resp: any) => {
        if(resp.status === 200) setSrc(resp.url)
        else throw new Error('No available Image')
      })
      .catch((err: any) =>  {setSrc('')})
    })()
  }, [])

  return (
    <TouchableOpacity style={styles.container}>

      <Image style={styles.image}
        defaultSource={{uri: ''}}
        source={src ? {uri: src} : require('../assets/cat-404.jpeg')} 
        resizeMode={'repeat'}
      /> 
    </TouchableOpacity>
  )

}
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH/3,
    overflow: 'hidden',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    marginBottom: 5,
    marginHorizontal: 2.5
  }
})