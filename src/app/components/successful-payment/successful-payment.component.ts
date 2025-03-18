import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Artwork } from '../../models/artwork';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'successful-payment',
    templateUrl: './successful-payment.component.html',
    styleUrl: './successful-payment.component.scss',
    imports: [NgFor, RouterLink]
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
