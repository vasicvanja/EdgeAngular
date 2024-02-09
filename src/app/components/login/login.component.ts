import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';


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
        .subscribe({
          next: (res) => {
            this.toastrService.success(res.errorMessage);
            this.loginForm.reset();
          },
          error: (err) => {
            this.toastrService.error(err?.error.errorMessage);
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid!");
    }
  }

}
