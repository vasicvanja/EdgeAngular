import { Component, OnInit } from '@angular/core';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cycle } from '../../models/cycle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cycles',
  templateUrl: './cycles.component.html',
  styleUrl: './cycles.component.scss'
})
export class CyclesComponent implements OnInit {

  cycles: Cycle[] = [];
  displayedCycles: Cycle[] = [];
  itemsPerPage: number = 10;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllCycles();
    this.onPageChanged(1);

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isUserLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
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

  openCycleDetails(cycle: Cycle) {
    this.router.navigate(['/cycle-details', cycle.Id]);
  }

  openCycleCreate() {
    this.router.navigate(['/cycle-create']);
  }

  openCycleUpdate(cycle: Cycle) {
    this.router.navigate(['/cycle-update', cycle.Id]);
  }

  onPageChanged(page: number) {
    const start = (page - 1) * this.itemsPerPage;
    const end = (start + this.itemsPerPage);
    this.displayedCycles = [...this.cycles.slice(start, end)];
  }
}