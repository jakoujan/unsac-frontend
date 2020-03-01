import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersistenceService } from 'angular-persistence';
import { ToastService } from './toast.service';
import { ICourseFilter } from '../filters/course-filter';
import { IResponse } from '../interfaces/response';
import { ICourse } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends Service {

  private static COURSE_LIST = 'api/courses/list';
  private static COURSE_SAVE = '/api/courses/save';
  private static COURSE_DELETE = '/api/courses/delete';


  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService, protected persistenceService: PersistenceService,
    protected toastService: ToastService) {
    super(http, persistenceService, spinner, toastService);
  }

  public filter(filter: ICourseFilter): Promise<IResponse> {
    const params = [{
      name: 'page',
      value: filter.page
    }];
    return this.preparePromiseFilterPost(CourseService.COURSE_LIST, filter, params);
  }

  public save(course: ICourse): Promise<IResponse> {
    return this.preparePromiseEntityPost(CourseService.COURSE_SAVE, course);
  }

  public delete(course: ICourse): Promise<IResponse> {
    return this.preparePromiseEntityPost(CourseService.COURSE_DELETE, course);
  }
}
