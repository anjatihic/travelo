import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {PlanTypeResponse} from "../model/PlanTypeResponse";
import {AuthService} from "./auth.service";
import {PostResponse} from "../model/PostResponse";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private rootUrl = 'http://localhost:8080/post';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private activePlanTypesSubject = new BehaviorSubject<PlanTypeResponse[]>([]);
  activePlanTypes$ = this.activePlanTypesSubject.asObservable();

  private specificGroupPostsSubject = new BehaviorSubject<PostResponse[]>([]);
  specificGroupPosts$ = this.specificGroupPostsSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) { }


  loadActivePlanTypes() {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    this.http.get<PlanTypeResponse[]>(`${this.rootUrl}/activePlanTypes`, options).pipe(
      tap(planTypes => {
        this.activePlanTypesSubject.next(planTypes);
      })
    ).subscribe();
  }

  newPost(postInfo: {planTypeId: number, title: string, content: string, plannedDateStart: Date, plannedDateEnd: Date, url: string}, groupId: number):
    Observable<PostResponse> {
    const bearerToken = this.authService.getToken();
    const userId = this.authService.getUserId();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    const postRequest = {
      ...postInfo,
      posterId: userId,
      groupId: groupId
    }

    return this.http.post<PostResponse>(this.rootUrl, postRequest, options).pipe(
      tap(response => {
        console.log('Response from newPost:', response);
      })
    )
  }

  getPostsByGroupId(groupId: number){
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    this.http.get<PostResponse[]>(`${this.rootUrl}/${groupId}`, options).pipe(
      tap(posts => {
        this.specificGroupPostsSubject.next(posts);
      })
    ).subscribe();
  }
}
