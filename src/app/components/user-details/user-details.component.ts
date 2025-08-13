import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-details',
  imports: [NgClass, NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  user!: User;
  userId!: string;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private usersService: UsersService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.userId = idParam;
        await this.getUserDetails(this.userId);
      } else {
        console.error('User Id not provided in route parameters.');
      }
    });

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isUserLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  async getUserDetails(userId: string) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.usersService.getUserById(userId);
      if (Succeeded) {
        this.user = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  viewOrderHistory(userId: string, userName: string) {
    this.router.navigate(['/order-history', userId, userName]);
  }

  openUserUpdate(userId: string) {
    this.router.navigate(['/user-update', userId]);
  }

}
