import { Component, OnInit } from '@angular/core';
import { EMovement } from 'src/app/enums/movement.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/components/ui/dialogs/dialog.service';
import { IInstructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/services/instructor.service';
import { IResposeData } from 'src/app/interfaces/response-data';
import { IInstructorFilter } from 'src/app/filters/instructor-filter';
import { constants } from 'src/environments/environment';
import { InstructorFormComponent } from '../instructor-form/instructor-form.component';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit {

  response: IResposeData<Array<IInstructor>> = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 30,
    to: 0,
    total: 0
  };

  filter: IInstructorFilter = {
    entity: {
      id: null,
      name: null,
      email: null,
      courses: null,
      telephone: null,
    },
    startDate: null,
    endDate: null,
    hidden: true,
    page: 1,
    rows: 20
  }
  hideFilter: boolean = true;
  editMovement: EMovement = EMovement.EDIT;

  constructor(private modalService: NgbModal, private instructorService: InstructorService, private dialog: DialogService) { }

  ngOnInit() {
    this.setFilter();
  }

  public newRecord() {
    const instructor: IInstructor = {
      id: 0,
      name: null,
      email: null, 
      courses: [],
      telephone: null
    };

    this.openForm(instructor, EMovement.NEW);
  }

  public edit(instructor: IInstructor) {
    this.openForm(instructor, EMovement.EDIT);
  }

  public pageChange(page: number) {
    this.filter.page = page;
    this.setFilter();
  }

  setFilter() {
    this.instructorService.filter(this.filter).then(response => {
      this.response = response.fields.response_data;
    });
  }

  public delete(instructor: IInstructor) {

    this.dialog.confirm(constants.CONFIRMATION_DIALOG_TITLE, 'Realmente desea eliminar a este usuario: ' + instructor + '?')
      .then((confirmed) => {
        if (confirmed) {
          this.instructorService.delete(instructor).then(response => {
            this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
            this.setFilter();
          });
        }
      });
  }

  public toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  public openForm(instructor: IInstructor, movement: EMovement) {
    const modalRef = this.modalService.open(InstructorFormComponent, { size: 'xl', centered: true, scrollable: true });
    modalRef.componentInstance.instructor = instructor;
    modalRef.result.then(usr => {
      this.instructorService.save(instructor).then(response => {
        if (movement === EMovement.NEW) {
          this.response.data.push(usr);
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message + ' Password de acceso: ' + response.fields.password);
        } else if (movement === EMovement.EDIT) {
          instructor = usr;
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
        }
      });
    });
  }

}
