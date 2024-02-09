import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserService } from '../../services';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
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
    FormsModule,
    RecaptchaModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  // Snackbar Configuration
  durationInSeconds = 5;

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  // Form Configuration
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  // Initializations
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
  }

  // Captcha Resolve
  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  // Form Submit
  public onSubmit(): void {
    this.userService.resetPassword$(this.emailControl.value!).subscribe(
      (val) => {
        this.openSnackBar(val.detail);
      },
      (res) => {
        this.openSnackBar(res.error.email[0]);
      }
    );

    this.emailControl.reset();
    this.emailControl.setErrors(null);
  }
}
