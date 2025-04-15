import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { UsersService } from '../../services/users.service';
import { RolesService } from '../../services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessages } from '../../const/response-messages';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'user-update',
  imports: [NgIf, FormsModule, NgClass, NgFor, ModalComponent, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  
  userForm: FormGroup;
  user!: User;
  roles!: Role[];
  submitted = false; // Flag to track form submission
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private rolesService: RolesService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group with validators
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      enabled: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.userId = idParam;
        await this.getAllRoles();
        await this.getUserDetails(this.userId);
      } else {
        console.error('User Id not provided in route parameters.');
      }
    });
  }

  async getUserDetails(userId: string) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.usersService.getUserById(userId);
      if (Succeeded) {
        this.user = Data;
        this.userForm.patchValue({
          userName: this.user.UserName,
          email: this.user.Email,
          phoneNumber: this.user.PhoneNumber,
          enabled: this.user.Enabled,
          role: this.user.Role
        });
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllRoles() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.rolesService.getAllRoles();
      if (Succeeded) {
        this.roles = Data;
        console.log(this.roles);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser() {
    this.submitted = true; // Mark form as submitted
    if (this.userForm.invalid) {
      return;
    }
    try {
      // Prepare updated user data
      const updatedUser = this.getUpdatedUserData();
      const { Succeeded, ErrorMessage } = await this.usersService.updateUser(updatedUser);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_success('User', updatedUser.UserName));
        this.userForm.reset(); // Reset form on success
        this.submitted = false; // Reset submission flag
        this.router.navigate(['/users']);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser() {
    try {
      const { Succeeded, ErrorMessage } = await this.usersService.deleteUser(this.userId);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Delete_success('User', this.user.UserName));
        this.router.navigate(['/users']);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  cancelDelete(): void {
    // No action needed
  }

  openResetPassword() {
    
  }

  private getUpdatedUserData(): User {
    return {
      ...this.user,
      UserName: this.userForm.controls['userName'].value,
      Email: this.userForm.controls['email'].value,
      PhoneNumber: this.userForm.controls['phoneNumber'].value,
      Enabled: this.userForm.controls['enabled'].value,
      Role: this.userForm.controls['role'].value
    };
  }
}
