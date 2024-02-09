import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Department,
  Employee,
  EmployeeBase,
  User,
} from '../../../domain/entities';
import {
  DepartmentService,
  EmployeeService,
  UserService,
} from '../../../services';
import { Observable, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    AsyncPipe,
  ],
  providers: [DepartmentService, EmployeeService, UserService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder,
    private departmentServcie: DepartmentService,
    private employeeService: EmployeeService,
    private userService: UserService
  ) {}

  deaprtments: Observable<Department[]> = this.departmentServcie
    .fetchDepartments$()
    .pipe(map((val) => val.departments));

  employees: Observable<Employee[]> = this.employeeService
    .fetchEmployees$()
    .pipe(map((val) => val.employees));

  users: Observable<User[]> = this.userService
    .fetchUsers$()
    .pipe(map((val) => val.users));

  addEmployeeForm = this.formBuilder.group<EmployeeBase>({
    user: null,
    email: '',
    password: '',
    fullName: '',
    aadhar: '',
    altPhone: '',
    currAddress: '',
    pan: '',
    permAddress: '',
    phone: '',
    department: null,
    manager: null,
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
