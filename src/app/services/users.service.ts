import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { firstValueFrom } from 'rxjs';
import { User } from "../models/user";
import { CreateUser } from "../models/user-create";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private baseUrl: string;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.baseUrl = environment.baseUrl;
    }

    public getAllUsers = (): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/Users/all", this.authService.getHttpOptions()));
    }

    public getUserById = (id: string): any => {
        return firstValueFrom(this.http.get(this.baseUrl + "/api/Users/" + id, this.authService.getHttpOptions()));
    }

    public createUser = (user: CreateUser): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/Users/create", user, this.authService.getHttpOptions()));
    }

    public updateUser = (user: User): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/Users/update", user, this.authService.getHttpOptions()));
    }

    public enableDisableUser = (id: string, enabled: boolean): any => {
        return firstValueFrom(this.http.post(this.baseUrl + `/api/Users/${id}/enableDisableUser?enabled=${enabled}`, {}, this.authService.getHttpOptions()));
    }

    public deleteUser = (id: string): any => {
        return firstValueFrom(this.http.post(this.baseUrl + `/api/Users/delete?id=${id}`, {}, this.authService.getHttpOptions()));
    }
}