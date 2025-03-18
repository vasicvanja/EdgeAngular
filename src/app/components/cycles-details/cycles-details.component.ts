import { Component, OnInit } from '@angular/core';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Cycle } from '../../models/cycle';
import { ResponseMessages } from '../../const/response-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../../models/artwork';
import { ArtworksService } from '../../services/artworks.service';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'cycles-details',
    templateUrl: './cycles-details.component.html',
    styleUrl: './cycles-details.component.scss',
    standalone: true,
    imports: [NgIf, NgFor]
})
export class CyclesDetailsComponent implements OnInit {

  cycle!: Cycle;
  cycleId: any;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private artworksService: ArtworksService,
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');

      if (idParam !== null) {
        this.cycleId = +idParam;
        await this.getCycleDetails(this.cycleId);
      } else {
        console.error('Cycle ID not provided in route parameters.');
      }
    });

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isUserLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async getCycleDetails(cycleId: number) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cyclesService.getCycleById(cycleId);
      if (Succeeded) {
        this.cycle = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  openArtworkDetails(artwork: Artwork) {
    this.router.navigate(['/artwork-details', artwork.Id]);
  }

  async removeFromCycle(artwork: Artwork) {
    try {
      artwork.CycleId = null; // Set the CycleId to null to remove it from the cycle
      const { Succeeded, ErrorMessage } = await this.artworksService.updateArtwork(artwork);
      if (Succeeded) {
        this.cycle.Artworks = this.cycle.Artworks.filter(a => a.Id !== artwork.Id); // Update the local cycle object
        this.toastrService.success(ResponseMessages.Remove_artwork_from_cycle(artwork.Name, this.cycle.Name));
        this.router.navigate(['cycle-details', this.cycle.Id]);
      }
      else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
