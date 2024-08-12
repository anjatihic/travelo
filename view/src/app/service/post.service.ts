import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {PlanTypeResponse} from "../model/PlanTypeResponse";
import {AuthService} from "./auth.service";

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
}
