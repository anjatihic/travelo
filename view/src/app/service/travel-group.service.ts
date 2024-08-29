import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, forkJoin, Observable, tap} from "rxjs";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {AuthService} from "./auth.service";
import {UserResponse} from "../model/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class TravelGroupService {
  private rootUrl = 'http://localhost:8080/travelGroup';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private travelGroupsSubject = new BehaviorSubject<TravelGroupResponse[]>([]);
  travelGroups$ = this.travelGroupsSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) { }



  loadTravelGroupsByUserId() {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };
    const userId = this.authService.getUserId();

    this.http.get<TravelGroupResponse[]>(`${this.rootUrl}/user/${userId}`, options).pipe(
      tap(groups => {
        this.travelGroupsSubject.next(groups);
      })
    ).subscribe();

  }

  createNewTravelGroup(groupInfo: {name: string, tripStart: Date, tripEnd: Date, description: string, image: string}):
    Observable<TravelGroupResponse> {
    const bearerToken = this.authService.getToken();
    const userId = this.authService.getUserId();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    const groupInfoWithUserId = {
      ...groupInfo,
      userIds: [userId]
    }

    return this.http.post<TravelGroupResponse>(this.rootUrl, groupInfoWithUserId, options).pipe(
      tap(response => {
          console.log('Response from createNewTravelGroup:', response);
      })
    )
  }

  getTravelGroupById(groupId: string) {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    return this.http.get<TravelGroupResponse>(`${this.rootUrl}/${groupId}`, options).pipe(
      tap(response => {
        console.log('Response from getGroupById:', response);
      })
    )

  }

  addUserToGroup(travelGroupCode: string) {
    const bearerToken = this.authService.getToken();
    const userId = this.authService.getUserId();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    console.log(travelGroupCode)

    return this.http.post<TravelGroupResponse>(`${this.rootUrl}/${travelGroupCode}/addUser/${userId}`,null, options).pipe(
      tap(group => {
        console.log('Response from addUserToGroup:', group)
      })
    )

  }

  getUsersByIds(userIds: number[]): Observable<UserResponse[]> {
    const bearerToken = this.authService.getToken();
    const options = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${bearerToken}`)
    };

    const requests = userIds.map( userId =>
    this.http.get<UserResponse>(`${this.rootUrl}/getUser/${userId}`, options));

    return forkJoin(requests).pipe(
      tap(users => {
        console.log('\'Response from getUsersByIds:\', users');
      })
    )
  }


}
