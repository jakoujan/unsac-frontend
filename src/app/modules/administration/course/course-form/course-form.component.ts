import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/interfaces/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input() course: ICourse;

  form: FormGroup;
  generalDataForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    if (this.course) {
      this.generalDataForm = this.fb.group({
        title: [this.course.title, Validators.required],
      });
      this.form = this.fb.group({
        generalData: this.generalDataForm,
      });
    } else {
      throw new Error('Datos del curso no definidos');
    }
  }

  public save() {
    this.course.title = this.generalDataForm.controls.title.value;
    this.activeModal.close(this.course);
  }
}
