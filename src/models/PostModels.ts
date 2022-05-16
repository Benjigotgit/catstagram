export interface Post {
  pk: number;
  name: string;
  image: string;
  timestamp_updated: string;
  timestamp_created: string;
  comments: Comment[]
}

export interface Comment {
  pk: number;
  text: string;
  entry: number;
  timestamp_updated: string;
  timestamp_created: string;
}

export interface FeedPostProps extends Post{
  onPress: Function 
}