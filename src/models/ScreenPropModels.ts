import { Post } from 'models'

export interface PostDetailsScreenProps {
  navigation: any;
  route: {
    params: Post
  }
}