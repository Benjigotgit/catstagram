export interface Post {
  pk: number;
  name: string;
  comments: Comment[]
}
export interface Comment {
  pk: number;
  text: string;
  entry: number;
  timestamp_updated: string;
  timestamp_created: string;
}