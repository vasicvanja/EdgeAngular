import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../../models/artwork';

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
}
