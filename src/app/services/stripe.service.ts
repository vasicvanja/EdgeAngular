import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { Artwork } from "../models/artwork";

@Injectable({
    providedIn: 'root'
})
export class StripeService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    // This method sends a POST request to the server to create a Stripe checkout session
    // the given artworks. It returns a Promise that resolves to the response from the server.
    public createCheckoutSession = (artworks: Artwork[]): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/Stripe/createCheckoutSession", artworks));
    }
}