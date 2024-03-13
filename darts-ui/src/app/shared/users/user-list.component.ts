import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { User, UserImpl } from 'src/app/models/user/user.model';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import UsersResponse from 'src/app/models/user/users-response.model.';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MessageResponse } from 'src/app/models/message-response.model';
import UserResponse from 'src/app/models/user/user-response.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();
  userList: User[] = [];
  filteredUserList: User[] = [];

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Users');
    this.logger.log('Users loaded');
    this.refreshTable();
  }

  refreshTable(): void {
    this.userService.getUsers().subscribe({
      next: (response: UsersResponse) => {
        console.log('response',response);
        this.userList = response.users;
        console.log('this.userList',this.userList);
        this.dataSource.data = response.users;
        this.filteredUserList = this.userList.slice();
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });

    
 
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // result will contain the form values
      if (result) {
        this.addUser(result.firstName, result.lastName, result.email);
      }
    });
  }

  addUser(firstName: string, lastName: string, email: string): void {
    this.userService.addUser(firstName, lastName, email).subscribe({
      next: (response: MessageResponse) => {
        console.log('User added successfully:', response);
      
        this.refreshTable();
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
      }
    });
  }


  

  deleteUser(user: User): void {



    Swal.fire({
      title: 'Hold up',
      text: 'Do you really want to delete ' + user.firstName + ' ' + user.lastName + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'I\'m sure',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user.userId).subscribe({
          next: (response: MessageResponse) => {
            if (response.returnCode != 200)
            {
              console.log('userId ' + user.userId + ' was deleted');
            }
            else{
              console.log('Problem: ', response.returnMessage);
            }
            this.refreshTable();
          }
        })
    } 

  });


   
  }


 
}
