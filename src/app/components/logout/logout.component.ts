import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  @Output() logoutCompleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService) {
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        this.toastrService.success(res.errorMessage);
        this.logoutCompleted.emit();
      },
      error: (err) => {
        this.toastrService.error(err?.error.errorMessage);
      }
    })
  }
}
