import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {TravelGroupResponse} from "../model/TravelGroupResponse";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TravelGroupService {
  private rootUrl = 'http://localhost:8080/travelGroup';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  createNewTravelGroup(groupInfo: {name: string, tripStart: Date, tripEnd: Date, description: string, coverImage: string}):
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

    // figure out hod to call properly
    return this.http.post<TravelGroupResponse>(this.rootUrl, groupInfoWithUserId, options).pipe(
      tap(response => {
          console.log('Response from createNewTravelGroup:', response);
      })
    )
  }
}
