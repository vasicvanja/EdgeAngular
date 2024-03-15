import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from '../models/register';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.baseUrl;
  }

  register(registerObj: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseUrl}/api/Authentication/Register`, registerObj, this.getHttpOptions());
  }

  login(loginObj: Login): Observable<any> {
    return this.http.post<Login>(`${this.baseUrl}/api/Authentication/Login`, loginObj).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.Data);
        this.loggedInSubject.next(true);
        this.router.navigate(['home']);
        return response;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Authentication/Logout`, '').pipe(
      map((response: any) => {
        localStorage.removeItem('token');
        this.loggedInSubject.next(false);
        return response;
      })
    );
  }

  getHttpOptions() {
    var token = localStorage.getItem('token');
    let httpOptions;

    if (token) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return httpOptions;
    }
    return httpOptions;
  }

  getTokenExpiration(token: string): Date | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload && tokenPayload.exp) {
        return new Date(tokenPayload.exp * 1000);
      }
    }
    catch (error) {
      console.error('Failed to parse token payload: ', error);
    }
    return null;
  }

  isLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    let isTokenValid = false;
    if (token) {
      const expiration = this.getTokenExpiration(token);
      if (expiration && expiration < new Date()) {
        localStorage.removeItem('token');
        return isTokenValid = false;
      }
      else {
        return isTokenValid = true;
      }
    }
    return isTokenValid;
  }

  isUserLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload ? tokenPayload.unique_name : null;
    }
    return null;
  }
}
