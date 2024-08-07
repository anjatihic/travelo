import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {SignupRequest} from "../model/SignupRequest";
import {JwtResponse} from "../model/JwtResponse";
import {jwtDecode} from "jwt-decode";


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
          this.saveUserId(response.id)
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

  saveUserId(userId: number): void {
    localStorage.setItem('auth-user-id', userId.toString());
  }

  getUserId(): string | null {
    return localStorage.getItem('auth-user-id');
}

  getUsername(): string | null {
    return localStorage.getItem('auth-username');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      if (exp === undefined) {
        return true;
      }
      return Date.now() > exp * 1000;
    } catch (e) {
      return true;
    }
  }

  logout(): void {
    this.http.post(this.authRootUrl + '/logout', {}, this.httpOptions).subscribe();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-username');
    localStorage.removeItem('auth-user-id');
  }
}
