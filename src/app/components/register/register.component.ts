import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
        .subscribe({
          next: (res: any) => {
            this.toastrService.success(res.errorMessage);
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            this.toastrService.error(err?.error.errorMessage);
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.registerForm);
      alert("Your form is invalid!")
    }
  }

}
