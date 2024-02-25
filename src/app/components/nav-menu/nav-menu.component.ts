import { Component } from '@angular/core';
import { Cycle } from '../../models/cycle';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  userLoggedIn: boolean = false;
  cycles: Cycle[] = [];
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService) {

  }

  async ngOnInit() {
    this.authService.isUserLoggedIn$().subscribe((isLoggedIn: boolean) => {
      this.userLoggedIn = isLoggedIn;

      this.cartService.getCartItemsCount$().subscribe((count: number) => {
        this.cartItemCount = count;
      });
    });
  }

  onLogOutCompleted() {
    this.authService.logout();
  }

}