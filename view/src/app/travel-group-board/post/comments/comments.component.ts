import {Component, Input, OnInit} from '@angular/core';
import {CommentResponse} from "../../../model/CommentResponse";
import {CommentService} from "../../../service/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  @Input() postId: number | undefined;
  comments: CommentResponse[] = [];

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    if(this.postId){
      this.commentService.loadCommentsByPostId(this.postId);

      this.commentService.comments$.subscribe(
        (response) => {
          this.comments = response;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      )
    }
  }

}
