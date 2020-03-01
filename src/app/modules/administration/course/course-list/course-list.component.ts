import { Component, OnInit } from '@angular/core';
import { EMovement } from 'src/app/enums/movement.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/components/ui/dialogs/dialog.service';
import { ICourse } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';
import { IResposeData } from 'src/app/interfaces/response-data';
import { ICourseFilter } from 'src/app/filters/course-filter';
import { constants } from 'src/environments/environment';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  response: IResposeData<Array<ICourse>> = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 30,
    to: 0,
    total: 0
  };

  filter: ICourseFilter = {
    entity: {
      id: null,
      title: null
    },
    startDate: null,
    endDate: null,
    hidden: true,
    page: 1,
    rows: 20
  }
  hideFilter: boolean = true;
  editMovement: EMovement = EMovement.EDIT;

  constructor(private modalService: NgbModal, private courseService: CourseService, private dialog: DialogService) { }

  ngOnInit() {
    this.setFilter();
  }

  public newRecord() {
    const course: ICourse = {
      id: 0,
      title: null
    };

    this.openForm(course, EMovement.NEW);
  }

  public edit(course: ICourse) {
    this.openForm(course, EMovement.EDIT);
  }

  public pageChange(page: number) {
    this.filter.page = page;
    this.setFilter();
  }

  setFilter() {
    this.courseService.filter(this.filter).then(response => {
      this.response = response.fields.response_data;
    });
  }

  public delete(course: ICourse) {

    this.dialog.confirm(constants.CONFIRMATION_DIALOG_TITLE, 'Realmente desea eliminar a este usuario: ' + course + '?')
      .then((confirmed) => {
        if (confirmed) {
          this.courseService.delete(course).then(response => {
            this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
            this.setFilter();
          });
        }
      });
  }

  public toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  public openForm(course: ICourse, movement: EMovement) {
    const modalRef = this.modalService.open(CourseFormComponent, { size: 'xl', centered: true, scrollable: true });
    modalRef.componentInstance.course = course;
    modalRef.result.then(usr => {
      this.courseService.save(course).then(response => {
        if (movement === EMovement.NEW) {
          this.response.data.push(usr);
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message + ' Password de acceso: ' + response.fields.password);
        } else if (movement === EMovement.EDIT) {
          course = usr;
          this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
        }
      });
    });
  }

}
