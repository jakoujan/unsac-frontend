import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/components/ui/ui.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiModule
  ],
  entryComponents: [
    CustomerFormComponent,
    UserFormComponent
  ]
})
export class AdministrationModule { }
