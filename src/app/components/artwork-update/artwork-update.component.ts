import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { ArtworkType } from '../../models/artwork-type';
import { CyclesService } from '../../services/cycles.service';
import { Cycle } from '../../models/cycle';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgIf, NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'artwork-update',
    templateUrl: './artwork-update.component.html',
    styleUrl: './artwork-update.component.scss',
    standalone: true,
    imports: [NgIf, FormsModule, NgClass, NgFor, ModalComponent]
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

  async getArtworkDetails(artworkId: number) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getArtworkById(artworkId);
      if (Succeeded) {
        this.artwork = Data;
        this.artworkForm.patchValue({
          name: this.artwork.Name,
          description: this.artwork.Description,
          technique: this.artwork.Technique,
          year: this.artwork.Year,
          price: this.artwork.Price,
          quantity: this.artwork.Quantity,
          type: this.artwork.Type,
          cycle: this.artwork.Id
        });
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

  cancelDelete(): void {
    // No action needed
  }
}
