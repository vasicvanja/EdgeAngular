import { Component } from '@angular/core';
import { CreateCycle } from '../../models/create-cycle';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'cycle-create',
  templateUrl: './cycle-create.component.html',
  styleUrl: './cycle-create.component.scss'
})
export class CycleCreateComponent {

  cycle: CreateCycle = new CreateCycle;
  cycleId: any;
  artworks!: Artwork[];
  selectedArtworks: Artwork[] = [];

  constructor(
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.cycle.ImageData = e.target.result.split(',')[1]; // Get the base64 part
      };
      reader.readAsDataURL(file);
    }
  }

  async createCycle() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cyclesService.createCycle(this.cycle);
      if (Succeeded) {
        this.cycleId = Data.cycleId;
        this.router.navigate(['/cycles']);
        this.toastrService.success(ResponseMessages.Create_success("Cycle"));
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
