import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register';
import ValidateForm from '../../helpers/validateForm';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const registerObj: Register = {
        Username: this.registerForm.get('username')?.value,
        Email: this.registerForm.get('email')?.value,
        Password: this.registerForm.get('password')?.value
      };

      this.authService.register(registerObj)
        .pipe(
          catchError((error) => {
            console.error('An error occurred:', error);
            this.toastrService.error(error.error.ErrorMessage);
            return throwError(error);
          })
        )
        .subscribe({
          next: (res: any) => {
            this.toastrService.success(res.ErrorMessage);
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            this.toastrService.error(err?.error.ErrorMessage);
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.registerForm);
      alert("Your form is invalid!")
    }
  }
}
