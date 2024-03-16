import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CreateContactMessage } from '../models/create-contact-message';

@Injectable({
    providedIn: 'root'
})
export class ContactMessagesService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public getAllContactMessages = (): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/ContactMessages/all"));
    }

    public getAllContactMessagesByEmail = (email: string): any => {
        return firstValueFrom(this.http.get(this.baseUrl + `/api/ContactMessages/allByEmail?email=${email}`, {}));
    }

    public getContactMessageById = (id: number): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/ContactMessages/" + id));
    }

    public createContactMessage = (contactMessage: CreateContactMessage): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/ContactMessages/create", contactMessage));
    }

    public deleteContactMessage = (id: number): any => {
        return firstValueFrom(this.http.post(this.baseUrl + `/api/ContactMessages/delete?id=${id}`, {}));
    }
}