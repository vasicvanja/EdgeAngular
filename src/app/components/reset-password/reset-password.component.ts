import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResetPassword } from '../../models/reset-password';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';
import { NgIf } from '@angular/common';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
    imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class ResetPasswordComponent implements OnInit {

  resetPassword!: ResetPassword;
  resetPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords() });
  }

  async onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    this.resetPassword = new ResetPassword(email, token, newPassword, confirmPassword);
    try {
      const { Data, Succeeded, ErrorMessage } = await this.authService.resetPassword(this.resetPassword);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Password_successful_reset);
        this.router.navigate(['/login']);
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  comparePasswords(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }
}
