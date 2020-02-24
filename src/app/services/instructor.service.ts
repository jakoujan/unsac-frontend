import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersistenceService } from 'angular-persistence';
import { ToastService } from './toast.service';
import { IInstructorFilter } from '../filters/instructor-filter';
import { IResponse } from '../interfaces/response';
import { IInstructor } from '../interfaces/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends Service {

  private static INSTRUCTOR_LIST = 'api/instructors/list';
  private static INSTRUCTOR_SAVE = '/api/instructors/save';
  private static INSTRUCTOR_DELETE = '/api/instructors/delete';


  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService, protected persistenceService: PersistenceService,
    protected toastService: ToastService) {
    super(http, persistenceService, spinner, toastService);
  }

  public filter(filter: IInstructorFilter): Promise<IResponse> {
    const params = [{
      name: 'page',
      value: filter.page
    }];
    return this.preparePromiseFilterPost(InstructorService.INSTRUCTOR_LIST, filter, params);
  }

  public save(instructor: IInstructor): Promise<IResponse> {
    return this.preparePromiseEntityPost(InstructorService.INSTRUCTOR_SAVE, instructor);
  }

  public delete(instructor: IInstructor): Promise<IResponse> {
    return this.preparePromiseEntityPost(InstructorService.INSTRUCTOR_DELETE, instructor);
  }
}
