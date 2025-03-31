import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { ArtworkType } from '../../models/artwork-type';
import { CyclesService } from '../../services/cycles.service';
import { Cycle } from '../../models/cycle';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgIf, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'artwork-update',
  templateUrl: './artwork-update.component.html',
  styleUrl: './artwork-update.component.scss',
  imports: [NgIf, FormsModule, NgClass, NgFor, ModalComponent, ReactiveFormsModule]
})
export class ArtworkUpdateComponent implements OnInit {

  artwork!: Artwork;
  artworkId: any;
  artworkTypes: string[] = Object.keys(ArtworkType).filter(key => isNaN(Number(key)));
  cycles: Cycle[] = [];
  artworkForm: FormGroup;
  submitted = false; // Flag to track form submission

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    // Initialize the form group with validators
    this.artworkForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      technique: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      imageData: [null],
      type: ['', Validators.required],
      cycleId: ['', Validators.required]
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

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        this.toastrService.error(ResponseMessages.Only_image_files_are_allowed);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.toastrService.error(ResponseMessages.File_size_exceeds_limit);
        return;
      }

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
          imageData: this.artwork.ImageData,
          type: this.artwork.Type,
          cycleId: this.artwork.CycleId
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
    this.submitted = true; // Mark form as submitted
    if (this.artworkForm.invalid) {
      return;
    }
    try {
      // Prepare updated artwork data
      const updatedArtwork = this.getUpdatedArtworkData();
      const { Succeeded, ErrorMessage } = await this.artworksService.updateArtwork(updatedArtwork);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_success("Artwork", updatedArtwork.Name));
        this.artworkForm.reset(); // Reset form on success
        this.submitted = false; // Reset submission flag
        this.router.navigate(['/artworks']);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private getUpdatedArtworkData(): Artwork {
    return {
      ...this.artwork,
      Name: this.artworkForm.controls['name'].value,
      Description: this.artworkForm.controls['description'].value,
      Technique: this.artworkForm.controls['technique'].value,
      Year: this.artworkForm.controls['year'].value,
      Price: this.artworkForm.controls['price'].value,
      Quantity: this.artworkForm.controls['quantity'].value,
      Type: this.artworkForm.controls['type'].value,
      CycleId: this.artworkForm.controls['cycleId'].value
    };
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
