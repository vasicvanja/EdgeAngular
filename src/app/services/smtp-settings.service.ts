import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { SmtpSettings } from "../models/smtp-settings";

@Injectable({
    providedIn: 'root'
})
export class SmtpSettingsService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public getSmtpSettings = (): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/SmtpSettings/getSmtpSettings"));
      }

    public updateSmtpSettings = (smtpSettings: SmtpSettings): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/SmtpSettings/update", smtpSettings));
    }
}
