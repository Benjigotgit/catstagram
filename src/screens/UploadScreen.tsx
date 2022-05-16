import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Platform} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import React from 'react'
import { ImageSelectorImageProps } from 'models'
import { HttpService, Apis, AppService } from 'services'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/AppContants';
import { Asset, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs'

export const UploadScreen = (props: any) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [imageSelected, setImageSelected] = useState<Asset>()
  const [postName, setPostName] = useState<string>('')

useEffect(() => {
  console.log('PostDetailsScreen Route.Params', props.route.params)
},[])


  const selectImage = async () => {
    try{
      let result = await launchImageLibrary({mediaType: 'photo', includeBase64: false})
      if(result){
        if(result.assets) {
          console.log('react-native-image-picker result',JSON.stringify(result))
          if(!result.assets[0]) return
          const image: Asset = result.assets[0]

          const newFilePath = RNFS.TemporaryDirectoryPath + '/' + image.fileName

          await RNFS.moveFile(image.uri, newFilePath)
            .then(resp => image.uri = newFilePath) //will add custom naming when api call is figured out
            .catch(err => console.log('MOVEFile error', err))
          console.log('Image Asset', image)
          setImageSelected(image)
  
        }
      }
    } catch(err){console.log('selectImage Error', err)}

    setLoading(false)
  }

 
  const uploadImage = async () => {
    if(!postName) return AppService.showAlert('Hold on...', 'Please enter a proper image and name the post')

    const body = {
      name: postName,
      // image: imageSelected.uri,  //having issues
      // type: imageSelected.type
    }
    console.log('uploadImage() Body', body)
    AppService.showLoading('...creating post')
    try{
      const resp = await HttpService.getInstance().post(Apis.POSTS, body)
      const data = resp.data
      AppService.showAlert('Image not uploaded', 'your post was created, but was given a default image due to technical issues with formating image upload')
      console.log('uploadImage()', JSON.stringify(data))
      setImageSelected(undefined)
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
      <TouchableOpacity disabled={!postName} onPress={uploadImage} style={styles.buttonStyles}>
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
    
    height: SCREEN_HEIGHT*0.55,
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
    
    marginVertical: 10
  },
  inputStyle: {
    color: 'black',
    fontSize: 15,
    height: 37,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  buttonStyles: {
    backgroundColor: '#0397f6',
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 37
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold'
  },
})

