import { Component, HostListener, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'app-users',
  imports: [NgFor, NgIf, ModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  itemsPerPage: number = 10;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  activeMenuUserId: number | null = null; // Track which menu is open
  selectedUserId: number | null = null;
  selectedUserName: string = '';

  constructor(
    private usersService: UsersService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    await this.getAllUsers();

    this.authService.isUserAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isUserLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    // Close context menu when clicking outside
    // document.addEventListener('click', () => {
    //   this.activeMenuUserId = null;
    // });
  }

  async getAllUsers() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.usersService.getAllUsers();
      if (Succeeded) {
        this.users = Data;
        return Data;
      }
      else {
        this.toastrService.error(ErrorMessage);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  openUserDetails(user: User) {
    this.router.navigate(['/user-details', user.Id]);
  }

  openUserCreate() {
    this.router.navigate(['/user-create']);
  }

  openUserUpdate(user: User) {
    this.router.navigate(['/user-update', user.Id]);
  }

  toggleContextMenu(userId: number, event: MouseEvent) {
    event.stopPropagation();
    this.activeMenuUserId = this.activeMenuUserId === userId ? null : userId;
  }

  @HostListener('document:click')
  closeContextMenu() {
    this.activeMenuUserId = null;
  }

  async deleteUser() {
    if (this.selectedUserId !== null) {
      try {
        const { Succeeded, ErrorMessage } = await this.usersService.deleteUser(this.selectedUserId);
        if (Succeeded) {
          this.toastrService.success(ResponseMessages.Delete_success("User", this.selectedUserName));
          await this.getAllUsers();
        }
        else {
          this.toastrService.error(ErrorMessage);
        }
      }
      catch (error) {
        console.error(error);
      }
      finally {
        this.selectedUserId = null;
        this.selectedUserName = '';
      }
    }
  }

  cancelDelete(): void {
    // No action needed
  }

  openDeleteModal(userId: number, userName: string) {
    this.selectedUserId = userId;
    this.selectedUserName = userName;
  }
}
