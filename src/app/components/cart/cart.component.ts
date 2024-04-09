import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Artwork } from '../../models/artwork';
import { ToastrService } from 'ngx-toastr';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Artwork[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.cartService.getCartItems$().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getTotalPrice$().subscribe(price => {
      this.totalPrice = price;
    });
  }

  removeFromCart(artwork: Artwork) {
    this.cartService.removeFromCart(artwork);
  }

  async createCheckoutSession() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cartService.createCheckoutSession(this.cartItems);
      if (Succeeded) {
        if (Data) {
          const stripe = await loadStripe(environment.publicKey);
          const result = await stripe?.redirectToCheckout({
            sessionId: Data.SessionId
          });
          if (result?.error) {
            console.error('Error redirecting to checkout:', result.error);
            this.toastrService.error(ResponseMessages.StripeCheckoutRedirectError);
          } else {
            // Clear the cart if the payment was successful
            this.cartService.clearCart();
          }
        }
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
