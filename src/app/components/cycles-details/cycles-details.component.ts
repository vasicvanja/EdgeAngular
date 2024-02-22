import { Component, OnInit } from '@angular/core';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { Cycle } from '../../models/cycle';
import { ResponseMessages } from '../../const/response-messages';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cycles-details',
  templateUrl: './cycles-details.component.html',
  styleUrl: './cycles-details.component.scss'
})
export class CyclesDetailsComponent implements OnInit {

  cycle!: Cycle;
  cycleId: any;

  constructor(
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
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

  async deleteCycle() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.cyclesService.deleteCycle(this.cycleId);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Delete_success("cycle", this.cycle.Name));
        this.router.navigate(['/cycles']);
        return Data;
      }
      else {  
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
