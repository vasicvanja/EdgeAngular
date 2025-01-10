import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { PagerComponent } from '../pager/pager.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'artworks',
    templateUrl: './artworks.component.html',
    styleUrl: './artworks.component.scss',
    standalone: true,
    imports: [NgIf, NgFor, PagerComponent]
})
export class ArtworksComponent implements OnInit {

  artworks: Artwork[] = [];
  cartItems: Artwork[] = [];
  initialQuantities: { [id: number]: number } = {};
  displayedArtworks: Artwork[] = [];
  itemsPerPage: number = 10;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllArtworks();
    this.onPageChanged(1);
    this.loadCartItems();

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isUserLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async getAllArtworks() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getAllArtworks();
      if (Succeeded) {
        this.artworks = Data;
        this.artworks.forEach(artwork => {
          if (artwork.Id !== null) {
            this.initialQuantities[artwork.Id] = artwork.Quantity;
          }
        });
        this.syncArtworkQuantities();
        return Data;
      }
      else {
        this.toastrService.error(ErrorMessage);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  openArtworkDetails(artwork: Artwork) {
    this.router.navigate(['/artwork-details', artwork.Id]);
  }

  openArtworkCreate() {
    this.router.navigate(['/artwork-create']);
  }

  openArtworkUpdate(artwork: Artwork) {
    this.router.navigate(['/artwork-update', artwork.Id]);
  }

  addToCart(artwork: Artwork) {
    this.cartService.addToCart(artwork);
  }

  loadCartItems() {
    this.cartService.getCartItems$().subscribe(items => {
      this.cartItems = items;
      this.syncArtworkQuantities();
    });
  }

  syncArtworkQuantities() {
    this.artworks.forEach(artwork => {
      if (artwork.Id !== null) {
        const cartItem = this.cartItems.find(item => item.Id === artwork.Id);
        if (cartItem) {
          const cartQuantity = cartItem.Quantity;
          artwork.Quantity = this.initialQuantities[artwork.Id] - cartQuantity;
        } else {
          artwork.Quantity = this.initialQuantities[artwork.Id];
        }
      }
    });
  }

  onPageChanged(page: number) {
    const start = (page - 1) * this.itemsPerPage;
    const end = (start + this.itemsPerPage);
    this.displayedArtworks = [...this.artworks.slice(start, end)];
  }
}