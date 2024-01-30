import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../domain/entities';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  displayedColumns: string[] = ['uid', 'username', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

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
    this.userService.fetchUsers$().subscribe((val) => {
      this.dataSource.data = val.users;
    });
  }

  addUser(): void {
    const addUserDialogRef = this.dialog.open(AddUserComponent);

    addUserDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.registerUser$(result).subscribe((res) => {
          this.dataSource.data = [res.user, ...this.dataSource.data];
        });
      }
    });
  }

  deleteUser(id: number) {
    const deleteUserDialogRef = this.dialog.open(DeleteUserComponent, {
      data: id,
    });

    deleteUserDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser$(id).subscribe((res) => {
          this.dataSource.data = this.dataSource.data.filter(
            (user) => user.id !== id
          );
        });
      }
    });
  }
}
