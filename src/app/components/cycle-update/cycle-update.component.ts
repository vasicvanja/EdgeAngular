import { Component, OnInit } from '@angular/core';
import { Cycle } from '../../models/cycle';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtworksService } from '../../services/artworks.service';
import { Artwork } from '../../models/artwork';
import { ModalComponent } from '../modal/modal.component';
import { NgIf, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'cycle-update',
  templateUrl: './cycle-update.component.html',
  styleUrl: './cycle-update.component.scss',
  imports: [NgIf, FormsModule, NgClass, NgFor, ModalComponent, ReactiveFormsModule]
})
export class CycleUpdateComponent implements OnInit {

  cycle!: Cycle;
  cycleId: any;
  cycleForm: FormGroup;
  selectArtworks!: Artwork[];
  submitted = false; // Flag to track form submission

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.cycleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      selectArtworks: [[]],
      imageData: [null]
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.cycleId = +idParam;
        await this.getCycleDetails(this.cycleId);
        await this.getAllUnassociatedArtworks();
      } else {
        console.error('Artwork Id not provided in route parameters.');
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
        this.cycle.ImageData = e.target.result.split(',')[1]; // Get the base64 part
      };
      reader.readAsDataURL(file);
    }
  }

  async updateCycle() {
    this.submitted = true; // Mark form as submitted
    if (this.cycleForm.invalid) {
      return;
    }
    try {
      // Prepaere updated cycle data
      const updatedCycle = this.getUpdatedCycleData();
      const { Succeeded, ErrorMessage } = await this.cyclesService.updateCycle(updatedCycle);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_success("Cycle", updatedCycle.Name));
        this.cycleForm.reset(); // Reset the form after successful update
        this.submitted = false; // Reset the submitted flag
        this.router.navigate(['/cycles']);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private getUpdatedCycleData(): Cycle {
    return {
      ...this.cycle,
      Name: this.cycleForm.controls['name'].value,
      Description: this.cycleForm.controls['description'].value,
      ArtworkIds: this.cycle.Artworks ? this.cycle.Artworks.map(a => a.Id) : []
    };
  }

  async getCycleDetails(cycleId: number) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cyclesService.getCycleById(cycleId);
      if (Succeeded) {
        this.cycle = Data;
        this.cycleForm.patchValue({
          name: this.cycle.Name,
          description: this.cycle.Description
        });
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCycle() {
    try {
      const { Succeeded, ErrorMessage } = await this.cyclesService.deleteCycle(this.cycleId);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Delete_success("cycle", this.cycle.Name));
        this.router.navigate(['/cycles']);
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

  async getAllUnassociatedArtworks() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.artworksService.getAllUnassociatedArtworks();
      if (Succeeded) {
        this.selectArtworks = Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
