import { Component, OnInit } from '@angular/core';
import { IUser } from "../../../../interfaces/user";
import { EMovement } from "../../../../enums/movement.enum";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';
import { IUserFilter } from 'src/app/filters/user-filter';
import { IResposeData } from 'src/app/interfaces/response-data';
import { DialogService } from 'src/app/components/ui/dialogs/dialog.service';
import { constants } from 'src/environments/environment';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Session } from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  response: IResposeData<Array<IUser>> = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 30,
    to: 0,
    total: 0
  };

  filter: IUserFilter = {
    entity: {
      id: null,
      name: null,
      username: null,
      modules: null,
      email: null
    },
    startDate: null,
    endDate: null,
    hidden: true,
    page: 1,
    rows: 20
  }
  hideFilter: boolean = true;
  editMovement: EMovement = EMovement.EDIT;

  constructor(private modalService: NgbModal, private userService: UserService, private dialog: DialogService, private persistenceService: PersistenceService) { }

  ngOnInit() {
    this.setFilter();

    const session: Session = this.persistenceService.get(constants.SESSION, StorageType.SESSION);
    if (session) {
      
    }
  }

  public newRecord() {
    const user: IUser = {
      id: 0,
      name: null,
      username: null,
      modules: [],
      email: null
    };

    this.openForm(user, EMovement.NEW);
  }

  public edit(user: IUser) {
    this.openForm(user, EMovement.EDIT);
  }

  public pageChange(page: number) {
    this.filter.page = page;
    this.setFilter();
  }

  setFilter() {
    this.userService.filter(this.filter).then(response => {
      this.response = response.fields.response_data;
    });
  }

  public delete(user: IUser) {

    this.dialog.confirm(constants.CONFIRMATION_DIALOG_TITLE, 'Realmente desea eliminar a este usuario: ' + user.username + '?')
      .then((confirmed) => {
        if (confirmed) {
          this.userService.delete(user).then(response => {
            this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
            this.setFilter();
          });
        }
      });
  }

  public toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  public openForm(user: IUser, movement: EMovement) {
    const modalRef = this.modalService.open(UserFormComponent, { size: 'xl', centered: true, scrollable: true });
    modalRef.componentInstance.user = user;
    modalRef.result.then(usr => {
      this.userService.save(user).then(response => {
        if (movement === EMovement.NEW) {
          this.response.data.push(usr);
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message + ' Password de acceso: ' + response.fields.password);
        } else if (movement === EMovement.EDIT) {
          user = usr;
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
        }
      });
    });
  }

}
