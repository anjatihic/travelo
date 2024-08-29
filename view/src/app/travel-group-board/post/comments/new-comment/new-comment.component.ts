import {Component, Input} from '@angular/core';
import {CommentService} from "../../../../service/comment.service";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css'
})
export class NewCommentComponent {
  @Input() postId: number | undefined;
  comment = '';

  constructor(private commentService: CommentService) {

  }

  onSubmit(){
    if (this.comment === '' || !this.postId){
      return;
    }

    this.commentService.newComment(this.comment, this.postId).subscribe(
      {
        next: data => {
          this.comment = '';
          this.commentService.loadCommentsByPostId(this.postId!);
        },
        error: err => {
          console.log('');
        }
      }
    )
  }

}
