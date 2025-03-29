import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginObj: Login = {
        Username: this.loginForm.get('username')?.value,
        Password: this.loginForm.get('password')?.value
      };

      this.authService.login(loginObj).subscribe({
        next: (res) => {
          this.toastrService.success('Login successful!', 'Success');
          this.loginForm.reset();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error during login:', err);
          const errorMessage = err?.error?.ErrorMessage || 'An unknown error occurred';
          this.toastrService.error(errorMessage, 'Login Failed');
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toastrService.error('Please fill in all required fields.', 'Form Invalid');
    }
  }
}