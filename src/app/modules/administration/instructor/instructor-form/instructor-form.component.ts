import { Component, OnInit, Input } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/instructor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

  cc = [
    { id: 1, title: 'Curso 1' },
    { id: 2, title: 'Curso 2' },
    { id: 5, title: 'Curso 5' },
    { id: 6, title: 'Curso 6' }
  ];

  ac = [
    { id: 3, title: 'Curso 3' },
    { id: 4, title: 'Curso 4' },
    { id: 7, title: 'Curso 7' },
    { id: 8, title: 'Curso 8' },
    { id: 9, title: 'Curso 9' },
    { id: 10, title: 'Curso 10' },
    { id: 11, title: 'Curso 11' },
    { id: 12, title: 'Curso 12' },
    { id: 13, title: 'Curso 13' },
    { id: 14, title: 'Curso 14' }
  ];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    if (this.instructor) {
      this.generalDataForm = this.fb.group({
        name: [this.instructor.name, Validators.required],
        email: [this.instructor.email, Validators.compose([Validators.required, Validators.email])],
      });
      this.form = this.fb.group({
        generalData: this.generalDataForm,
      });
    } else {
      throw new Error('Datos del instructor no definidos');
    }
  }

  public save() {
    this.instructor.name = this.generalDataForm.controls.business_name.value;
    this.instructor.email = this.generalDataForm.controls.email.value;
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
