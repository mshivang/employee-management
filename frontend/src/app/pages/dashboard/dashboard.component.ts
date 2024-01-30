import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { User } from '../../domain/entities';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ManageEmployeesComponent,
    ManageDepartmentsComponent,
    ManageUsersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router, private userService: UserService) {}

  private unsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.userService
      .getUser$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data === null) {
          this.router.navigate(['']);
        } else {
          if (!data.is_superuser) {
            this.router.navigate(['my-department']);
          }
          
          this.user = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
