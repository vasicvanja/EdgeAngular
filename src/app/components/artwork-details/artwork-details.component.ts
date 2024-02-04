import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrl: './artwork-details.component.scss'
})
export class ArtworkDetailsComponent implements OnInit {

  artwork!: Artwork;

  constructor(
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

    }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      
      if (idParam !== null) {
        const artworkId = +idParam;
        await this.getArtworkDetails(artworkId);
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
}
