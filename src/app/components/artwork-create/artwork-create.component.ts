import { Component } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';
import { Router } from '@angular/router';
import { ArtworkType } from '../../models/artwork-type';
import { CreateArtwork } from '../../models/create-artwork';

@Component({
  selector: 'artwork-create', 
  templateUrl: './artwork-create.component.html',
  styleUrl: './artwork-create.component.scss'
})
export class ArtworkCreateComponent {

  artwork: CreateArtwork = new CreateArtwork;
  artworkId: any;
  artworkTypes: string[] = Object.keys(ArtworkType).filter(key => isNaN(Number(key)));

  constructor(
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  async createArtwork() {
    try {
      console.log(this.artwork);
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.createArtwork(this.artwork);
      if (Succeeded) {
        this.artworkId = Data.artworkId;
        this.router.navigate(['/artworks']);
        this.toastrService.success(ResponseMessages.Success_create_artwork);
        return Data;
      } else {
        this.toastrService.error(ErrorMessage)
      }
    } catch (error) {
      console.error(error);
    }
  }

  getArtworkTypeValue(typeName: string): ArtworkType {
    return ArtworkType[typeName as keyof typeof ArtworkType];

  }
}
