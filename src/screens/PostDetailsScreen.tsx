import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, TextInput} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import React from 'react'
import {useSelector} from 'react-redux';
import { Post, PostDetailsScreenProps } from 'models'
import { HttpService, BASE_URL_IMAGE, Apis, AppService } from 'services'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/AppContants';
import { Comment } from 'components';

export const PostDetailsScreen = (props: PostDetailsScreenProps) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [src, setSrc] = useState<string>('')
  const [post, setPost] = useState<Post>()
  const [commentText, setCommentText] = useState<string>('')

    useEffect(() => {
      console.log('PostDetailsScreen Route.Params', props.route.params)
      getPostDetails()
    },[])

  const getPostDetails = async () => {
    !loading || setLoading(true)
    let data: Post | undefined;
    AppService.showLoading('...Loading post details')
    try{
      const resp = await HttpService.getInstance().get(Apis.POSTS+'/'+props.route.params.pk)
      data = resp.data
      console.log('getPostDetails()', data)
    } catch (e){
      console.error('ERROR getPostDetails ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
    }
    setPost(data)
    AppService.hideLoading()

    setLoading(false)
  }

  const postComment = async () => {
    const body = {
      text: commentText,
    }
    AppService.showLoading('...Posting comment')
    try{
      const resp = await HttpService.getInstance().post(Apis.COMMENTS, body)
      console.log('postComment() successful')
      setCommentText('')
      // getPostDetails() call this once comment issue is resolved
    } catch (e){
      console.error('ERROR postComment ', JSON.stringify(e))
      AppService.showAlert('Opps... Error', JSON.stringify(e))
    }
    AppService.hideLoading()
    AppService.showToast('Comment Successful', 50)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
         {post && post.image 
            ? <Image  style={styles.image} source={ {uri:  post ? BASE_URL_IMAGE+post.image : ''}} />
            : <View style={styles.imageLoader}><ActivityIndicator /></View>
          }
      </View>

      <View style={styles.uploadCommentContainer}>
        <TextInput 
          value={commentText}
          onChangeText={setCommentText}
          style={styles.inputStyle}
        />
        <TouchableOpacity onPress={postComment} style={styles.buttonStyles}>
          <Text style={styles.textStyles}>Comment</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.commentHeader}>Comments</Text>
        {post && 
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.pk.toString()}
          renderItem={({item, index}) => <Comment {...item}/>}
        /> }
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
    alignItems: 'center',
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
  },
  buttonStyles: {
    backgroundColor: '#0397f6',
    width: '25%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 37
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold'
  },
  commentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
  }
})

