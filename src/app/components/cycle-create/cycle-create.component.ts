import { Component, OnInit } from '@angular/core';
import { CreateCycle } from '../../models/create-cycle';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';

@Component({
  selector: 'cycle-create',
  templateUrl: './cycle-create.component.html',
  styleUrl: './cycle-create.component.scss'
})
export class CycleCreateComponent implements OnInit {

  cycle: CreateCycle = new CreateCycle;
  cycleId: any;
  artworks!: Artwork[];
  selectedArtworks: Artwork[] = [];

  constructor(
    private cyclesService: CyclesService,
    private artworksService: ArtworksService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {
    // this.getAllArtworks();
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

  // async getAllArtworks() {
  //   try {
  //     const { Data, Succeeded, ErrorMessage } = await this.artworksService.getAllArtworks();
  //     if (Succeeded) {
  //       this.artworks = Data
  //       return Data;
  //     }
  //     else {
  //       this.toastrService.error(ErrorMessage);
  //     }
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }
}
