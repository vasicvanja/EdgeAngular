import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'user-details',
  imports: [NgClass, NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  user!: User;
  userId!: string;

  constructor(
    private usersService: UsersService,
    private toastrService: ToastrService,
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

  viewOrderHistory(userId: string) {
    this.router.navigate(['/order-history', userId]);
  }
}
