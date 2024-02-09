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
import {
  Department,
  Employee,
  EmployeeBase,
  User,
} from '../../../domain/entities';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import {
  DepartmentService,
  EmployeeService,
  UserService,
} from '../../../services';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [DepartmentService, EmployeeService, UserService],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent {
  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private formBuilder: FormBuilder,
    private departmentServcie: DepartmentService,
    private employeeService: EmployeeService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Employee
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

  editEmployeeForm = this.formBuilder.group<EmployeeBase>({
    ...this.data,
    manager: this.data.manager ? this.data.manager.eid : null,
    user: (this.data.user as User).id,
    department: this.data.department ? this.data.department.id : null,
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
