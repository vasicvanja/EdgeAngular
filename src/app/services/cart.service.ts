import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artwork } from '../models/artwork';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../const/response-messages';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<Artwork[]>([]);
    private baseUrl: string;

    constructor(private http: HttpClient, private toastrService: ToastrService) {
        this.baseUrl = environment.baseUrl;
        this.loadCartItems();
    }

    getCartItems$() {
        return this.cartItems.asObservable();
    }

    getTotalPrice$() {
        return this.cartItems.asObservable().pipe(
            map(items => items.reduce((total, item) => total + item.Price * item.Quantity, 0))
        );
    }

    getCartItemsCount$() {
        return this.cartItems.asObservable().pipe(
            map(items => items.reduce((count, item) => count + item.Quantity, 0))
        );
    }

    clearCart() {
        this.cartItems.next([]);
        this.saveCartItems();
    }

    addToCart(artwork: Artwork) {
        const currentItems = this.cartItems.value;
        const foundItem = currentItems.find(item => item.Id === artwork.Id);
        if (artwork && artwork != null && artwork.Quantity > 0) {
            if (foundItem && foundItem != null) {
                foundItem.Quantity++;
                artwork.Quantity--;
            }
            else {
                const newArtwork = { ...artwork, Quantity: 1 };
                artwork.Quantity--;
                currentItems.push(newArtwork);
            }
            this.cartItems.next(currentItems);
            this.saveCartItems();
            this.toastrService.success(ResponseMessages.Successfully_added_to_cart(artwork.Name));
        }
        else {
            this.toastrService.error(ResponseMessages.Unsuccessfully_added_to_cart);
        }
    }

    removeFromCart(artwork: Artwork) {
        const currentItems = this.cartItems.value;
        const itemToRemove = currentItems.find(item => item.Id === artwork.Id);
        if (itemToRemove && itemToRemove != null && itemToRemove.Quantity > 0) {
            itemToRemove.Quantity--;
            if (itemToRemove.Quantity === 0) {
                const index = currentItems.indexOf(itemToRemove);
                currentItems.splice(index, 1);
            }
            this.cartItems.next(currentItems);
            this.saveCartItems();
            this.toastrService.success(ResponseMessages.Successfully_removed_from_cart(itemToRemove.Name));
        }
        else {
            this.toastrService.error(ResponseMessages.Unsuccessfully_removed_from_cart);
        }
    }

    saveCartItems() {
        const cartData = {
            items: this.cartItems.value,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('cartItems', JSON.stringify(cartData));
    }

    loadCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            const cartData = JSON.parse(cartItems);
            const lifetime = 2 * 60 * 60 * 1000;
            if (new Date().getTime() - cartData.timestamp > lifetime) {
                localStorage.removeItem('cartItems');
            } else {
                if (Array.isArray(cartData.items)) {
                    this.cartItems.next(cartData.items);
                } else {
                    console.warn('Invalid cart data:', cartData);
                    this.cartItems.next([]);
                }
            }
        }
    }

    public createCheckoutSession = (artworks: Artwork[]): any => {
        return firstValueFrom(this.http.post(this.baseUrl + "/api/Stripe/createCheckoutSession", artworks));
    }
}
