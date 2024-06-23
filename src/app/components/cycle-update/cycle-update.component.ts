import { Component, OnInit } from '@angular/core';
import { Cycle } from '../../models/cycle';
import { CyclesService } from '../../services/cycles.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cycle-update',
  templateUrl: './cycle-update.component.html',
  styleUrl: './cycle-update.component.scss'
})
export class CycleUpdateComponent implements OnInit {

  cycle!: Cycle;
  cycleId: any;
  cycleForm: FormGroup;

  constructor(
    private cyclesService: CyclesService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      this.cycleForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.cycleId = +idParam;
        await this.getCycleDetails(this.cycleId);
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
        this.cycle.ImageData = e.target.result.split(',')[1]; // Get the base64 part
      };
      reader.readAsDataURL(file);
    }
  }

  async updateCycle() {
    if (this.cycleForm.invalid) {
      return;
    }
    try {
      const { Succeeded, ErrorMessage } = await this.cyclesService.updateCycle(this.cycle);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_success("Cycle", this.cycle.Name));
        this.router.navigate(['/cycles']);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
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
}
