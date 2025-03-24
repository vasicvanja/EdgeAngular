import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseMessages } from '../../const/response-messages';
import { CreateUser } from '../../models/user-create';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/role';

@Component({
  selector: 'user-create',
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {

  roles: Role[] = [];
  user: CreateUser = new CreateUser;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  async ngOnInit() {
    await this.getAllRoles();
  }

  async createUser() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.usersService.createUser(this.user);
      if (Succeeded) {
        this.router.navigate(['/users']);
        this.toastrService.success(ResponseMessages.Create_success("User"));
        return Data;
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
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

}
