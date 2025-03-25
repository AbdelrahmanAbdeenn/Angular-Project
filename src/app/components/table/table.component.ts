import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { UserService, UserData } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { STableComponent } from '../../shared/s-table/s-table.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogModule, STableComponent, DialogComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ConfirmationService]
})
export class TableComponent implements OnInit {
  users: UserData[] = [];
  rows = 5;
  dialogIsVisible = false;
  deletedUser:UserData |null = null

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' },
    { field: 'address.city', header: 'City' }
  ];

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  editUser(user: UserData) {
    //this.toastService.show('info', 'Edit Triggered', `${user.name}`);
  }

  deleteUser(user: UserData) {
    this.dialogIsVisible = true;
    this.deletedUser = user;
  }
  onConfirmDelete(){
    if(!this.deletedUser){
      return;
    }
    this.userService.deleteUser(this.deletedUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== this.deletedUser?.id);
        this.deletedUser =null;
        this.dialogIsVisible = false;
        this.toastService.show('error', 'Deleted', 'User deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.toastService.show('error', 'Error', 'Failed to delete user');
      }
    });
  
  
  }
  onDialogClose() {
    this.dialogIsVisible = false;
    this.deletedUser = null;
  }
  
  
}
