import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BASE_URL_IMAGE } from 'services'
import { Post, PostDetailsScreenProps } from 'models'
import { SCREEN_WIDTH } from 'constants/AppContants'
import { CAT404 } from '@app/assets'


export const FeedPost = (props: FeedPostProps) => {
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    
    (async function() { //checks if post image returns status 200
      await fetch(BASE_URL_IMAGE+props.image)
        .then((resp: any) => {
          if(resp.status === 200) {
            setSrc(resp.url)
          }
          else {
            throw new Error('No available Image')
          }
        })
        .catch((err: any) =>  {setSrc('404');})

      setLoading(false)
    })()
  }, [])

  return (
    <TouchableOpacity 
      style={styles.container}
      disabled={loading} 
      onPress={() => {
        if(src != '404') props.onPress(props)
        else props.onPress(false)
      }} 
    >
      {!loading 
        ? <Image  style={styles.image} source={src && src!='404' ? {uri: src} : CAT404} /> 
        : <View style={styles.container} />
      }
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
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    marginBottom: 2,
    marginHorizontal: 1,
    backgroundColor: 'white',

  }
})