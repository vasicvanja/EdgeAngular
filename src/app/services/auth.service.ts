import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from '../models/register';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
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
  private loggedInSubject: BehaviorSubject<boolean>;
  private isAdminSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.baseUrl;
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.isAdminSubject = new BehaviorSubject<boolean>(this.isUserAdmin());
  }

  register(registerObj: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseUrl}/api/Authentication/Register`, registerObj, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  login(loginObj: Login): Observable<any> {
    return this.http.post<Login>(`${this.baseUrl}/api/Authentication/Login`, loginObj)
      .pipe(
        map((response: any) => {
          this.storeToken(response.Data);
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
        localStorage.removeItem('authToken');
        this.loggedInSubject.next(false);
        this.isAdminSubject.next(false);
        return response;
      })
    );
  }

  getHttpOptions() {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return { headers };
  }

  getUsername(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload ? tokenPayload.unique_name : null;
    }
    return null;
  }

  isUserAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  isUserLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  forgotPassword = (email: string): any => {
    return firstValueFrom(this.http.post(this.baseUrl + `/api/Authentication/forgotPassword?email=${email}`, {}));
  }

  resetPassword = (resetPassword: ResetPassword): any => {
    return firstValueFrom(this.http.post(this.baseUrl + '/api/Authentication/resetPassword', resetPassword));
  }

  /** Private Methods **/

  private isUserAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const isAdmin = decodedToken.role === 'Admin';
        return isAdmin;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }

  private isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}