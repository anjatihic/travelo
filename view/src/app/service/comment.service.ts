import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {CommentResponse} from "../model/CommentResponse";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private rootUrl = 'http://localhost:8080/comment';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private commentsSubject: BehaviorSubject<CommentResponse[]> = new BehaviorSubject<CommentResponse[]>([]);
  public comments$: Observable<CommentResponse[]> = this.commentsSubject.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) { }

  loadCommentsByPostId(postId: number) {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    return this.http.get<CommentResponse[]>(`${this.rootUrl}/${postId}`, options).pipe(
      tap(
        response => {
          this.commentsSubject.next(response);
        }
      )
    ).subscribe();
  }

  newComment(content: string, postId: number): Observable<CommentResponse> {
    const bearerToken = this.authService.getToken();
    const commenterId = this.authService.getUserId();

    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    const commentRequest = {
      content: content,
      commenterId: commenterId,
      postId: postId
    }


    return this.http.post<CommentResponse>(this.rootUrl, commentRequest, options).pipe(
      tap(
        response => {
          const currentComments = this.commentsSubject.value;
          this.commentsSubject.next([...currentComments, response]);
          console.log('Response from newComment: ', response);
        }
      )
    )
  }

}
