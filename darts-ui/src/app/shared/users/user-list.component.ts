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
import UserResponse from 'src/app/models/user/user-response.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MessageResponse } from 'src/app/models/message-response.model';


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
      next: (response: UserResponse) => {
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
        // Optionally, you can refresh the user list or perform other actions after adding the user
        this.refreshTable();
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
      }
    });
  }
  

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
    //this.refreshTable();
  }


 
}
