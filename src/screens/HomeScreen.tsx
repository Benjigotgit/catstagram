import { View, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useState, useEffect } from 'react'
import React from 'react'
import { Post,  } from 'models'
import { HttpService, Apis, AppService } from 'services'
import { FeedPost } from 'components'

export const HomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    !loading || setLoading(true)
    let data: Post[] = [];
    AppService.showLoading('...Loading posts')
    try{
      const resp = await HttpService.getInstance().get(Apis.POSTS)
      data = resp.data
      console.log('RESPONSE getPosts() ===> ', JSON.stringify(data))
    } catch (e){
      console.error('ERROR getPosts ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
      data = []
    }
    setPosts(data)
    AppService.hideLoading()
    setLoading(false)
  }

  const onImagePress = (image: Post | false) => {
    console.log('Image pressed ', image)
    if(!image) return AppService.showAlert('Post Error', 'This post has an image that could not be found')
    console.log('props', navigation.navigate('PostDetailsScreen', image))
  }

  return (
    <View style={styles.container}>
        {!loading? (
          <FlatList 
            data={posts}
            keyExtractor={item => item.pk.toString()}
            numColumns={3}
            // initialNumToRender={21} would implement if api accepted pagination parameters
            style={styles.listStyles}
            renderItem={({item, index}) => <FeedPost onPress={onImagePress} {...item}/>}
          /> 
          ) : (
            <View style={{flex: 1, zIndex: 100, top: '30%'}}>
              <ActivityIndicator size={'large'}/> 
            </View>
      
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listStyles:{
    marginRight: 2,
    marginLeft: 1
  },
  buttonStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'blue'
  }
})