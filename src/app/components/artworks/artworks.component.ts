import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { PagerComponent } from '../pager/pager.component';
import { NgIf, NgFor, CurrencyPipe, NgClass } from '@angular/common';
import { ArtworkFilter } from '../../models/artwork-filter';
import { FormsModule } from '@angular/forms';
import { CyclesService } from '../../services/cycles.service';
import { Cycle } from '../../models/cycle';
import { ArtworkType } from '../../models/artwork-type';

@Component({
  selector: 'artworks',
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss',
  imports: [NgIf, NgFor, PagerComponent, FormsModule, CurrencyPipe, NgClass]
})
export class ArtworksComponent implements OnInit {

  artworks: Artwork[] = [];
  cycles: Cycle[] = [];
  cartItems: Artwork[] = [];
  initialQuantities: { [id: number]: number } = {};
  artworkTypes: string[] = Object.keys(ArtworkType).filter(key => isNaN(Number(key)));
  displayedArtworks: Artwork[] = [];
  itemsPerPage: number = 10;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  filter: ArtworkFilter = new ArtworkFilter(null, 0, null, null, null, null, "", "");
  @ViewChild(PagerComponent) pager!: PagerComponent;

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllArtworks();
    await this.getAllCycles();
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

  async getAllCycles() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cyclesService.getAllCycles();
      if (Succeeded) {
        this.cycles = Data;
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

  async applyFilters() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getFilteredArtworks(this.filter);
      if (Succeeded) {
        this.artworks = Data;
        this.onPageChanged(1);
        if (this.pager) {
          this.pager.currentPage = 1;   // reset to first page
          this.pager.setPage(1);     // call pager’s update logic if you have one
        }
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  clearFilters() {
    this.filter = new ArtworkFilter(null, 0, null, null, null, null, "", "");
    this.applyFilters();
  }

  getArtworkTypeValue(typeName: string): ArtworkType {
    return ArtworkType[typeName as keyof typeof ArtworkType];
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