import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from '../models/register';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ResetPassword } from '../models/reset-password';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserAdmin());

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
        this.isAdminSubject.next(this.isUserAdmin());
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
        this.isAdminSubject.next(false);
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

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null;
    }
    return null;
  }

  isUserAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      // Ensure that 'next' is not called on an undefined subject
      if (this.isAdminSubject) {
        this.isAdminSubject.next(false);
      }
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const isAdmin = decodedToken.role === "Admin";

      if (this.isAdminSubject) {
        this.isAdminSubject.next(isAdmin);
      }
      return isAdmin;
    }
    catch (error) {
      console.error('Error decoding token:', error);

      if (this.isAdminSubject) {
        this.isAdminSubject.next(false);
      }

      return false;
    }
  }

  isUserAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  public forgotPassword = (email: string): any => {
    return firstValueFrom(this.http.post(this.baseUrl + `/api/Authentication/forgotPassword?email=${email}`, {}));
  }

  public resetPassword = (resetPassword: ResetPassword): any => {
    return firstValueFrom(this.http.post(this.baseUrl + '/api/Authentication/resetPassword', resetPassword));
  }
}