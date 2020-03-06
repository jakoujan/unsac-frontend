import { Component, OnInit, Input } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/instructor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit {

  @Input() instructor: IInstructor;

  form: FormGroup;
  generalDataForm: FormGroup;
  addressForm: FormGroup;
  ccFilter: string = '';
  acFilter: string = '';

  cc = [];

  ac = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit() {
    if (this.instructor) {
      this.courseService.actives().then(response => {
        this.ac = response.fields.data.filter(c => this.instructor.courses.filter(cf => cf.id === c.id).length === 0);
      });
      this.cc = this.instructor.courses;
      this.generalDataForm = this.fb.group({
        name: [this.instructor.name, Validators.required],
        email: [this.instructor.email, Validators.compose([Validators.required, Validators.email])],
        telephone: [this.instructor.telephone, Validators.required],
      });
      this.form = this.fb.group({
        generalData: this.generalDataForm,
      });
    } else {
      throw new Error('Datos del instructor no definidos');
    }
  }

  public save() {
    this.instructor.name = this.generalDataForm.controls.name.value;
    this.instructor.email = this.generalDataForm.controls.email.value;
    this.instructor.telephone = this.generalDataForm.controls.telephone.value;
    this.activeModal.close(this.instructor);
  }

  public drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public get acc() {
    const f = this.acFilter.toLowerCase();
    return f ? this.ac.filter(item => item.title.toLowerCase().indexOf(f) >= 0) : this.ac;
  }
  public get ccc() {
    const f = this.ccFilter.toLowerCase();
    return f ? this.cc.filter(item => item.title.toLowerCase().indexOf(f) >= 0) : this.cc;
  }

}
