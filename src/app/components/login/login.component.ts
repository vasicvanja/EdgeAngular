import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService) {
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
      }

      this.authService.login(loginObj)
        .pipe(
          catchError((error) => {
            console.error('An error occurred:', error);
            this.toastrService.error(ResponseMessages.Sing_in_failure);
            return of(null);
          })
        )
        .subscribe({
          next: (res) => {
            this.toastrService.success(res.ErrorMessage);
            this.loginForm.reset();
          },
          error: (err) => {
            this.toastrService.error(err?.error.ErrorMessage);
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid!");
    }
  }

}
