import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../../domain/entities';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { ViewDepartmentComponent } from '../view-department/view-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-manage-departments',
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
  templateUrl: './manage-departments.component.html',
  styleUrl: './manage-departments.component.css',
})
export class ManageDepartmentsComponent implements OnInit, AfterViewInit {
  constructor(
    private departmentService: DepartmentService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  displayedColumns: string[] = ['id', 'name', 'desc', 'actions'];
  dataSource = new MatTableDataSource<Department>([]);

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
    this.departmentService.fetchDepartments$().subscribe((val) => {
      this.dataSource.data = val.departments;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addDepartment(): void {
    const addDepartmentDialogRef = this.dialog.open(AddDepartmentComponent);

    addDepartmentDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.departmentService.addDepartment$(result).subscribe((res) => {
          this.dataSource.data = [res.department, ...this.dataSource.data];
        });
      }
    });
  }

  editDepartment(department: Department): void {
    const editDepartmentDialogRef = this.dialog.open(EditDepartmentComponent, {
      data: department,
    });

    editDepartmentDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.departmentService
          .editDepartment$(department.id, result)
          .subscribe((res) => {
            const updatedDepartment = res.department;

            const updatedDepartments = this.dataSource.data.map((dept) =>
              dept.id === department.id ? updatedDepartment : dept
            );

            this.dataSource.data = updatedDepartments;
          });
      }
    });
  }

  viewDepartment(department: Department): void {
    const viewDepartmentDialogRef = this.dialog.open(ViewDepartmentComponent, {
      data: department,
    });
  }

  deleteDepartment(id: string) {
    const deleteDepartmentDialogRef = this.dialog.open(
      DeleteDepartmentComponent,
      {
        data: id,
      }
    );

    deleteDepartmentDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.departmentService.deleteDepartment$(id).subscribe((res) => {
          this.dataSource.data = this.dataSource.data.filter(
            (department) => department.id !== id
          );
        });
      }
    });
  }
}
