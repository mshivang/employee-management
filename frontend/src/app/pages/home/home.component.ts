import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { LoginParams, User } from '../../domain/entities';
import { UserService } from '../../services';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  durationInSeconds = 5;

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  loginForm = this.formBuilder.group<LoginParams>({
    username: '',
    password: '',
  });

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
  }

  public onSubmit(): void {
    this.userService.loginUser$(this.loginForm.value as LoginParams).subscribe(
      (val) => {
        this.userService.setUser(val.user);
        if (val.user.is_superuser) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['my-department']);
        }
      },
      (res) => {
        this.openSnackBar(res.error.non_field_errors[0]);
      }
    );

    this.loginForm.reset();
  }
}
