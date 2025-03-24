import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CreateContactMessage } from '../models/create-contact-message';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ContactMessagesService {

    private baseUrl: string;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.baseUrl = environment.baseUrl;
    }

    public getAllContactMessages = (): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/ContactMessages/all", this.authService.getHttpOptions()));
    }

    public getAllContactMessagesByEmail = (email: string): any => {
        return firstValueFrom(this.http.get(this.baseUrl + `/api/ContactMessages/allByEmail?email=${email}`, this.authService.getHttpOptions()));
    }

    public getContactMessageById = (id: number): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/ContactMessages/" + id, this.authService.getHttpOptions()));
    }

    public createContactMessage = (contactMessage: CreateContactMessage): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/ContactMessages/create", contactMessage));
    }

    public deleteContactMessage = (id: number): any => {
        return firstValueFrom(this.http.post(this.baseUrl + `/api/ContactMessages/delete?id=${id}`, {}, this.authService.getHttpOptions()));
    }
}