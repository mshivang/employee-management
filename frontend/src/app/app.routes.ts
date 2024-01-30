import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyDepartmentComponent } from './pages/my-department/my-department.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-department', component: MyDepartmentComponent },
];
