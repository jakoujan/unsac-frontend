import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CustomerListComponent } from './modules/administration/customer/customer-list/customer-list.component';
import { LoginComponent } from './modules/security/login/login.component';
import { SessionGuard } from './guards/session.guard';
import { UserListComponent } from './modules/administration/user/user-list/user-list.component';
import { InstructorListComponent } from './modules/administration/instructor/instructor-list/instructor-list.component';
import { CourseListComponent } from './modules/administration/course/course-list/course-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [SessionGuard], data: {
      validate: false,
      module: 1,
      id: 0
    }
  },
  {
    path: 'administration/customers', component: CustomerListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 1,
      id: 4
    }
  },
  {
    path: 'administration/users', component: UserListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 1,
      id: 5
    }
  },
  {
    path: 'administration/instructors', component: InstructorListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 1,
      id: 6
    }
  }
  ,
  {
    path: 'administration/courses', component: CourseListComponent, canActivate: [SessionGuard], data: {
      validate: true,
      module: 1,
      id: 7
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
