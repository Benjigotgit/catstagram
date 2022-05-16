import { ViewStyle, TextStyle } from 'react-native'

export interface Comment {
  pk: number;
  text: string;
  entry: number;
  timestamp_updated: string;
  timestamp_created: string;
}

export interface CommentProps extends Comment{
  containerStyle?: ViewStyle 
  textStyle?: TextStyle
}