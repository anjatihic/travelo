import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {SignupRequest} from "../model/SignupRequest";
import {JwtResponse} from "../model/JwtResponse";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authRootUrl = 'http://localhost:8080/api/auth';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(this.authRootUrl + '/signup', signupRequest, this.httpOptions);
  }

  login(credentials: { username: string, password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.authRootUrl + '/signin', credentials, this.httpOptions).pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token);
          this.saveUsername(response.username);
        }
      })
    )
  }

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  saveUsername(username: string): void {
    localStorage.setItem('auth-username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('auth-username');
  }
}
