import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../../domain/entities';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-manage-employees',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.css',
})
export class ManageEmployeesComponent implements OnInit, AfterViewInit {
  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  displayedColumns: string[] = [
    'eid',
    'fullName',
    'manager',
    'department',
    'actions',
  ];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.employeeService.fetchEmployees$().subscribe((val) => {
      this.dataSource.data = val.employees;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEmployee(): void {
    const addEmployeeDialogRef = this.dialog.open(AddEmployeeComponent);

    addEmployeeDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.addEmployee$(result).subscribe((res) => {
          this.dataSource.data = [res.employee, ...this.dataSource.data];
        });
      }
    });
  }

  editEmployee(employee: Employee): void {
    const editEmployeeDialogRef = this.dialog.open(EditEmployeeComponent, {
      data: employee,
    });

    editEmployeeDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService
          .editEmployee$(employee.eid, result)
          .subscribe((res) => {
            const updatedEmployee = res.employee;

            const updatedEmployees = this.dataSource.data.map((emp) =>
              emp.eid === employee.eid ? updatedEmployee : emp
            );

            this.dataSource.data = updatedEmployees;
          });
      }
    });
  }

  viewEmployee(employee: Employee): void {
    const viewEmployeeDialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: employee,
    });
  }

  deleteEmployee(id: string) {
    const deleteEmployeeDialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: id,
    });

    deleteEmployeeDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployee$(id).subscribe((res) => {
          this.dataSource.data = this.dataSource.data.filter(
            (emp) => emp.eid !== id
          );
        });
      }
    });
  }
}
