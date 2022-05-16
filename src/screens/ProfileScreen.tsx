import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, TextInput} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import React from 'react'
import {useSelector} from 'react-redux';
import { ImageSelectorImageProps, Post, PostDetailsScreenProps } from 'models'
import { HttpService, BASE_URL_IMAGE, Apis, AppService } from 'services'
import { FeedPost } from 'components'
import { Loader } from 'components'
import axios from 'axios'
import { ReduxDispatcher } from 'redux/services/redux-dispatcher';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/AppContants';
import { CAT404 } from '@app/assets'
import moment from 'moment'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const ProfileScreen = (props: PostDetailsScreenProps) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [imageSelected, setImageSelected] = useState<ImageSelectorImageProps>()
  const [postName, setPostName] = useState<string>('')

useEffect(() => {
  console.log('PostDetailsScreen Route.Params', props.route.params)
},[])


  const selectImage = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'})
    if(result){
      if(result.assets) setImageSelected(result.assets[0])
      console.log(JSON.stringify(result))
    }
    setLoading(false)
  }


  const uploadImage = async () => {
    if(!postName || !imageSelected) return AppService.showAlert('Hold on...', 'Please enter a proper image and name the post')

    const body = {
      name: postName,
      image: imageSelected.uri  //having issues
    }
  
    console.log('uploadImage() Body', body)
    AppService.showLoading('...creating post')

    try{
      const resp = await HttpService.getInstance().post(Apis.POSTS, body)
      const data = resp.data
      AppService.showAlert('Image not uploaded', 'your post was created, but was given a default image due to technical issues with formating image upload')
      console.log('uploadImage()', JSON.stringify(data))
    } catch (e){
      console.error('ERROR uploadImage ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
    }

    AppService.hideLoading()

    setLoading(false)
  }




  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>          
         <Image  style={styles.image}
          source={imageSelected ? {uri: imageSelected.uri} : require('../assets/cat-404.jpeg')} 
        />
</View>

    <View style={styles.uploadCommentContainer}>
      <TextInput 
        placeholder="Post's name..."
        value={postName}
        onChangeText={setPostName}
        style={styles.inputStyle}
      />
      <View style={{flexDirection: 'column', width: '25%', }}>
      <TouchableOpacity onPress={selectImage} style={[styles.buttonStyles, {marginBottom: 10}]}>
        <Text style={styles.textStyles}>Select</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!postName || !imageSelected} onPress={uploadImage} style={styles.buttonStyles}>
        <Text style={styles.textStyles}>Upload</Text>
      </TouchableOpacity>

      </View>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },

  imageContainer: {
    width: SCREEN_WIDTH,
    
    height: SCREEN_HEIGHT*0.60,
    backgroundColor: '#f7f7f7'
  },
  imageLoader: {
    top: '20%'
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginBottom: 2,
    marginHorizontal: 1,
    resizeMode: 'contain'
  },
  uploadCommentContainer: {
    marginHorizontal: '7%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    
    marginVertical: 20
  },
  inputStyle: {
    color: 'black',
    fontSize: 15,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
  },
  buttonStyles: {
    backgroundColor: '#0397f6',
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold'
  },
})

