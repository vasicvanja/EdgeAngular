import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cycle } from '../../models/cycle';
import { AuthService } from '../../services/auth.service';
import { CyclesService } from '../../services/cycles.service';


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  userLoggedIn: boolean = false;
  cycles: Cycle[] = [];

  constructor(
    private authService: AuthService, 
    private cyclesService: CyclesService, 
    private toastrService: ToastrService) {
      
  }

  async ngOnInit() {
    this.authService.isUserLoggedIn$().subscribe((isLoggedIn: boolean) => {
      this.userLoggedIn = isLoggedIn;
    });

    await this.getAllCycles();
  }

  onLogOutCompleted() {
    this.authService.logout();
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
}
