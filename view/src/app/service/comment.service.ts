import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {CommentResponse} from "../model/CommentResponse";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private rootUrl = 'http://localhost:8080/comment';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private authService: AuthService, private http: HttpClient) { }

  loadCommentsByPostId(postId: number) {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    return this.http.get<CommentResponse[]>(`${this.rootUrl}/${postId}`, options).pipe(
      tap(
        response => {
          console.log('Fetched comments for the post: ', response);
        }
      )
    )
  }

}
