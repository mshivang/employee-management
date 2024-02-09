import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department, DepartmentBase } from '../../../domain/entities';
import { DepartmentService } from '../../../services';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './add-department.component.html',
  providers: [DepartmentService],
  styleUrl: './add-department.component.css',
})
export class AddDepartmentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    private formBuilder: FormBuilder,
    private departmentServcie: DepartmentService
  ) {}

  private unsubscribe = new Subject<void>();

  deaprtments: Department[] = [];

  ngOnInit(): void {
    this.departmentServcie
      .fetchDepartments$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((val) => (this.deaprtments = val.departments));
  }

  addDepartmentForm = this.formBuilder.group<DepartmentBase>({
    name: '',
    desc: '',
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
