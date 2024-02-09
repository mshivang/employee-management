import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyDepartmentComponent } from './pages/my-department/my-department.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-department', component: MyDepartmentComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];
