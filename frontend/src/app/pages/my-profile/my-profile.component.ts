import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../domain/entities';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  providers: [UserService],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  employee$: Observable<Employee> = this.userService
    .fetchMyProfile$()
    .pipe(map((val) => val.employee));
}
