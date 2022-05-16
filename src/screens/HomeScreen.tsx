import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import React from 'react'
import {useSelector} from 'react-redux';
import { Post, PostDetailsScreenProps } from 'models'
import { HttpService, BASE_URL_IMAGE, Apis, AppService } from 'services'
import { FeedPost } from 'components'
import { Loader } from 'components'
import axios from 'axios'
import { ReduxDispatcher } from 'redux/services/redux-dispatcher';
 


export const HomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  
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
      setHasError(false)
    } catch (e){
      console.error('ERROR getPosts ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
      data = []
      setHasError(true)
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