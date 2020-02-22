import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CustomerListComponent } from './modules/administration/customer/customer-list/customer-list.component';
import { LoginComponent } from './modules/security/login/login.component';
import { SessionGuard } from './guards/session.guard';
import { UserListComponent } from './modules/administration/user/user-list/user-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [SessionGuard], data: {
      validate: false,
      module: 'main',
      id: 'dashboard'
    }
  },
  {
    path: 'administration/customers', component: CustomerListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 'administration',
      id: 'customers'
    }
  },
  {
    path: 'administration/users', component: UserListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 'administration',
      id: 'users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
