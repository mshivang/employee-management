import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { DepartmentService, UserService } from '../../services';
import { Router } from '@angular/router';
import { Department, Employee, User } from '../../domain/entities';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewEmployeeComponent } from '../dashboard/view-employee/view-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-department',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './my-department.component.html',
  styleUrl: './my-department.component.css',
})
export class MyDepartmentComponent implements OnInit, OnDestroy {
  user: User | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private departmentService: DepartmentService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  department: Observable<Department> = this.departmentService
    .fetchMyDepartment$()
    .pipe(map((val) => val.department));

  private unsubscribe = new Subject<void>();

  displayedColumns: string[] = ['eid', 'fullName', 'manager'];
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

  viewEmployee(employee: Employee): void {
    const viewEmployeeDialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: employee,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userService
      .getUser$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data === null) {
          this.router.navigate(['']);
        } else {
          this.user = data;
        }
      });

    this.departmentService
      .fetchMyDepartment$()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(map((val) => val.employees))
      .subscribe((val) => (this.dataSource.data = val));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
