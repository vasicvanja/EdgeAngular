import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { ArtworkType } from '../../models/artwork-type';
import { CyclesService } from '../../services/cycles.service';
import { Cycle } from '../../models/cycle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'artwork-update',
  templateUrl: './artwork-update.component.html',
  styleUrl: './artwork-update.component.scss'
})
export class ArtworkUpdateComponent implements OnInit {

  artwork!: Artwork;
  artworkId: any;
  artworkTypes: string[] = Object.keys(ArtworkType).filter(key => isNaN(Number(key)));
  cycles: Cycle[] = [];
  artworkForm: FormGroup;

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      this.artworkForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        technique: ['', Validators.required],
        year: ['', Validators.required],
        price: ['', Validators.required],
        type: ['', Validators.required]
      });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.artworkId = +idParam;
        await this.getAllCycles();
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

  async updateArtwork() {
    if (this.artworkForm.invalid) {
      return;
    }
    try {
      const { Succeeded, ErrorMessage } = await this.artworksService.updateArtwork(this.artwork);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_success("Artwork", this.artwork.Name));
        this.router.navigate(['/artworks']);
      } else {
        this.toastrService.error(ErrorMessage);
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
