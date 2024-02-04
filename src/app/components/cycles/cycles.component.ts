import { Component, OnInit } from '@angular/core';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cycle } from '../../models/cycle';

@Component({
  selector: 'cycles',
  templateUrl: './cycles.component.html',
  styleUrl: './cycles.component.scss'
})
export class CyclesComponent implements OnInit {

  cycles: Cycle[] = [];

  constructor(
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllCycles();
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
}
