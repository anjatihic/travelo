export interface CommentResponse{
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  commenterUsername: string;
}
