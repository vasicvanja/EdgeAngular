import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  async onForgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      alert('Your form is invalid!');
      return;
    }
    try {
      const email = this.forgotPasswordForm.get('email')?.value;
      const { Data, Succeeded, ErrorMessage } = await this.authService.forgotPassword(email);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Forgot_password_success);
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
