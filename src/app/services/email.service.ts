import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { EmailMessage } from "../models/email-message";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public sendEmail = (emailMessage: EmailMessage): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/Email/sendEmail", emailMessage));
    }
}