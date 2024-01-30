import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Department } from '../../../domain/entities';

@Component({
  selector: 'app-view-department',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './view-department.component.html',
  styleUrl: './view-department.component.css',
})
export class ViewDepartmentComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
