import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { STATES, COUNTRIES } from 'src/app/catalogs/catalogs';
import { MODULES } from 'src/app/modules';
import { Permission } from './permission';
import { buildFormPermissions, buildUserPermissions } from 'src/app/helpers/helpers';
import { validateName } from 'src/app/helpers/validation-helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() user: IUser;

  form: FormGroup;
  generalDataForm: FormGroup;
  modulesForm: FormGroup;
  states: Array<Item> = STATES;
  countries: Array<Item> = COUNTRIES;
  modules: any = MODULES.map(a => ({ ...a }));
  permissions: Array<Permission> = [];


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {

    if (this.user) {
      this.generalDataForm = this.fb.group({
        user: [this.user.user, Validators.required, validateName(this.userService)],
        name: [this.user.name, Validators.required],
        email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      });
      if (this.user.id !== 0) {
        this.generalDataForm.controls.user.disable();
      }
      this.permissions = buildFormPermissions(this.modules, this.user.modules);

      this.form = this.fb.group({
        generalData: this.generalDataForm,
      });
    } else {
      throw new Error('Datos del cliente no definidos');
    }
  }

  public save() {
    this.user.user = this.generalDataForm.controls.user.value;
    this.user.name = this.generalDataForm.controls.name.value;
    this.user.email = this.generalDataForm.controls.email.value;
    this.user.modules = buildUserPermissions(this.permissions);
    this.activeModal.close(this.user);
  }

}
