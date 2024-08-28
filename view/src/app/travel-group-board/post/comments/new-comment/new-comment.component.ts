import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../../../service/comment.service";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css'
})
export class NewCommentComponent {
  comment = '';

  constructor(private commentService: CommentService) {

  }

  onSubmit(){
    //send to backend
  }

}
