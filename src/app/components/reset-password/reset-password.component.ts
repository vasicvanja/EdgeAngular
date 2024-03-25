import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PASSWORD_REGEX } from '../../const/regex-validators';
import { ResetPassword } from '../../models/reset-password';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
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
    });
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
}
