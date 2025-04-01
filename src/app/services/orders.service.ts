import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Order } from "../models/order";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    private baseUrl: string;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.baseUrl = environment.baseUrl;
    }

    public getOrderById = (id: string): any => {
        return this.http.get(this.baseUrl + "/api/Orders/" + id, this.authService.getHttpOptions());
    }

    public getAllOrdersByUserId = (userId: string): any => {
        return this.http.get(this.baseUrl + "/api/Orders/all/" + userId, this.authService.getHttpOptions());
    }

    public createOrder = (order: Order): any => {
        return this.http.post(this.baseUrl + "/api/Orders/create", order, this.authService.getHttpOptions());
    }
}