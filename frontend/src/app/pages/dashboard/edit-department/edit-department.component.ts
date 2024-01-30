import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatButtonModule } from '@angular/material/f';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department, DepartmentBase } from '../../../domain/entities';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
})
export class EditDepartmentComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDepartmentComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) {}

  editDepartmentForm = this.formBuilder.group<DepartmentBase>(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
