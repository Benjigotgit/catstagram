import { Comment } from 'models'

export interface Post {
  pk: number;
  name: string;
  image: string;
  timestamp_updated: string;
  timestamp_created: string;
  comments: Comment[]
}



export interface FeedPostProps extends Post{
  onPress: Function 
}