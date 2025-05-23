import { Component } from '@angular/core';
import { Cycle } from '../../models/cycle';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { LogoutComponent } from '../logout/logout.component';
import { NgIf, NgClass } from '@angular/common';


@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss'],
    imports: [RouterLink, NgIf, NgClass, LogoutComponent]
})
export class NavMenuComponent {
  cycles: Cycle[] = [];
  cartItemCount: number = 0;
  isLoginOrRegisterPage!: boolean;
  loggedInUsername: string | null = null;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public themeService: ThemeService,
    private router: Router) {
      this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginOrRegisterPage = ['/login', '/register'].includes(this.router.url);
      }
    });
  }

  async ngOnInit() {
    this.authService.isUserLoggedIn$().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.loggedInUsername = this.authService.getUsername();
    });

    this.cartService.getCartItemsCount$().subscribe((count: number) => {
      this.cartItemCount = count;
    });

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  onLogOutCompleted() {
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openUserDetails() {
    this.router.navigate(['/user-details', this.authService.getUserId()]);
  }
}