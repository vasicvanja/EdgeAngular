import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { StripeService } from '../../services/stripe.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrl: './successful-payment.component.scss',
  imports: [NgFor, RouterLink, CurrencyPipe]
})
export class SuccessfulPaymentComponent implements OnInit {

  purchasedItems: Artwork[] = [];

  constructor(
    private stripeService: StripeService, 
    private route: ActivatedRoute, 
    private toastrService: ToastrService, 
    private cartService: CartService) {

  }

  async ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('sessionId');
    if (sessionId) {
      await this.getSessionArtworks(sessionId);
    }
    this.cartService.clearCart();
  }

  async getSessionArtworks(sessionId: string) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.stripeService.getSessionArtworks(sessionId);
      if (Succeeded) {
        this.purchasedItems = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  totalPrice() {
    return this.purchasedItems.reduce((sum, item) => sum + (item.Price * item.Quantity), 0);
  }
}
