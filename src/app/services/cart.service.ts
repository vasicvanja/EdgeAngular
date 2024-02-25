import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artwork } from '../models/artwork';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<Artwork[]>([]);

    // This is the constructor of the CartService class. It initializes the cartItems 
    // property as a BehaviorSubject that holds an array of Artwork objects. The BehaviorSubject 
    // is a type of subject from the RxJS library that can emit the current value to new subscribers.
    constructor() {
        this.loadCartItems();
    }

    // This method returns an Observable of the current cart items.
    // An Observable is a stream of values that can be subscribed to
    getCartItems$() {
        return this.cartItems.asObservable();
    }

    // This method returns an Observable of the total price of the items in the cart. It uses the map operator 
    // to transform the Observable of cart items into an Observable of the total price. The reduce function 
    // is used to calculate the total price by summing up the price of each item.
    getTotalPrice$() {
        return this.cartItems.asObservable().pipe(
            map(items => items.reduce((total, item) => total + item.Price, 0))
        );
    }

    // The getCartItemsCount$() method returns an Observable of the total number of items in the cart.
    // It uses the map operator to transform the Observable of cart items into an Observable of the 
    // count of items. The length property of the array is used to calculate the total number of items. 
    // This method can be subscribed to for getting updates whenever the number of items in the cart changes.
    // This can be particularly useful for updating UI elements that display the number of items in the cart.
    getCartItemsCount$() {
        return this.cartItems.asObservable().pipe(
            map(items => items.length)
        );
    }

    // This method adds an artwork to the cart. It first gets the current cart items, 
    // then pushes the new artwork to this array, and finally updates the cartItems 
    // BehaviorSubject with the new array. After updating the cart items, it calls 
    // saveCartItems() to persist the new cart items in LocalStorage.
    addToCart(artwork: Artwork) {
        const currentItems = this.cartItems.value;
        currentItems.push(artwork);
        this.cartItems.next(currentItems);
        this.saveCartItems();
    }

    // This method removes an artwork from the cart. It first gets the current cart items,
    // then finds the index of the artwork to be removed, and if the artwork is found in 
    // the cart, it removes it from the array. Finally, it updates the cartItems BehaviorSubject
    // with the new array and calls saveCartItems() to persist the new cart items in LocalStorage.
    removeFromCart(artwork: Artwork) {
        const currentItems = this.cartItems.value;
        const index = currentItems.findIndex(item => item.Id === artwork.Id);
        if (index > -1) {
            currentItems.splice(index, 1);
            this.cartItems.next(currentItems);
            this.saveCartItems();
        }
    }

    // This private method saves the current cart items in LocalStorage along with 
    // the current timestamp. It usesJSON.stringify to convert the array of cart 
    // items into a JSON string, because LocalStorage can only store strings.
    saveCartItems() {
        const cartData = {
            items: this.cartItems.value,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('cartItems', JSON.stringify(cartData));
    }

    // This private method loads the cart items from LocalStorage. It uses JSON.parse
    // to convert the JSON string back into an array of cart items. If there are 
    // saved cart items in LocalStorage, it updates the cartItems BehaviorSubject with these items.
    // The method checks the timestamp when loading the cart items. If the data is older than the 
    // specified lifetime, it removes the data from LocalStorage.
    loadCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            const cartData = JSON.parse(cartItems);
            const lifetime = 24 * 60 * 60 * 1000; // Lifetime of 24 hours
            if (new Date().getTime() - cartData.timestamp > lifetime) {
                // If the data is older than the lifetime, clear it
                localStorage.removeItem('cartItems');
            } else {
                // Otherwise, load the data
                this.cartItems.next(cartData.items);
            }
        }
    }
}
