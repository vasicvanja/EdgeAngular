import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Artwork[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

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
}
