import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'artworks',
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss'
})
export class ArtworksComponent implements OnInit {
  
  artworks: Artwork[] = [];

  constructor(
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllArtworks();
  }

  async getAllArtworks() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getAllArtworks();
      if (Succeeded) {
        this.artworks = Data
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
}
