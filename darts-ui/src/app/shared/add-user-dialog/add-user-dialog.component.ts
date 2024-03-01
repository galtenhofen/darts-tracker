import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Call the addUser method with the form values
    this.dialogRef.close({ firstName: this.firstName, lastName: this.lastName, email: this.email });
  }
}
