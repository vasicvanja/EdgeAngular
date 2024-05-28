import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrl: './successful-payment.component.scss'
})
export class SuccessfulPaymentComponent implements OnInit {

  purchasedItems: Artwork[] = [];

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.clearCart();
    this.cartService.getLastPurchasedItems$().subscribe(items => {
      this.purchasedItems = items;
    });
  }

}
