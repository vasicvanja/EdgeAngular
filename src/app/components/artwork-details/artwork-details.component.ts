import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';
import { ResponseMessages } from '../../const/response-messages';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrl: './artwork-details.component.scss'
})
export class ArtworkDetailsComponent implements OnInit {

  artwork!: Artwork;
  artworkId: any;

  constructor(
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.artworkId = +idParam;
        await this.getArtworkDetails(this.artworkId);
      } else {
        console.error('Artwork ID not provided in route parameters.');
      }
    });
  }

  async getArtworkDetails(artworkId: number) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getArtworkById(artworkId);
      if (Succeeded) {
        this.artwork = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteArtwork() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.deleteArtwork(this.artworkId);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Delete_success("artwork", this.artwork.Name));
        this.router.navigate(['/artworks']);
        return Data;
      }
      else {  
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  addToCart(artwork: Artwork) {
    this.cartService.addToCart(artwork);
  }
}
