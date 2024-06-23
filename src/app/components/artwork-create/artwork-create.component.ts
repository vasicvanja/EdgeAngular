import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';
import { Router } from '@angular/router';
import { ArtworkType } from '../../models/artwork-type';
import { CreateArtwork } from '../../models/create-artwork';
import { Cycle } from '../../models/cycle';
import { CyclesService } from '../../services/cycles.service';

@Component({
  selector: 'artwork-create',
  templateUrl: './artwork-create.component.html',
  styleUrl: './artwork-create.component.scss'
})
export class ArtworkCreateComponent implements OnInit {

  artwork: CreateArtwork = new CreateArtwork;
  artworkId: any;
  artworkTypes: string[] = Object.keys(ArtworkType).filter(key => isNaN(Number(key)));
  cycles: Cycle[] = [];

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllCycles();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.artwork.ImageData = e.target.result.split(',')[1]; // Get the base64 part
      };
      reader.readAsDataURL(file);
    }
  }

  async createArtwork() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.createArtwork(this.artwork);
      if (Succeeded) {
        this.artworkId = Data.artworkId;
        this.router.navigate(['/artworks']);
        this.toastrService.success(ResponseMessages.Create_success("Artwork"));
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
}
