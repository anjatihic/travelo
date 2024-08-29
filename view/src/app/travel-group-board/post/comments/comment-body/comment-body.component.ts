import {Component, Input} from '@angular/core';
import {CommentResponse} from "../../../../model/CommentResponse";

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrl: './comment-body.component.css'
})
export class CommentBodyComponent {

  @Input() comment: CommentResponse | undefined;

}
