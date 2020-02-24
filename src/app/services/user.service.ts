import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResponse } from '../interfaces/response';
import { IUserFilter } from '../filters/user-filter';
import { IUser } from '../interfaces/user';
import { PersistenceService } from 'angular-persistence';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  private static USER_LIST = 'api/users/list';
  private static USER_SAVE = 'api/users/save';
  private static USER_DELETE = 'api/users/delete';
  private static USER_EXISTS = 'api/users/exists';



  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService, protected persistenceService: PersistenceService,
    protected toastService: ToastService) {
    super(http, persistenceService, spinner, toastService);
  }

  public filter(filter: IUserFilter): Promise<IResponse> {
    const params = [{
      name: 'page',
      value: filter.page
    }];
    return this.preparePromiseFilterPost(UserService.USER_LIST, filter, params);
  }

  public save(user: IUser): Promise<IResponse> {
    return this.preparePromiseEntityPost(UserService.USER_SAVE, user);
  }

  public delete(user: IUser): Promise<IResponse> {
    return this.preparePromiseEntityPost(UserService.USER_DELETE, user);
  }

  public isNameExists(user: string): Observable<HttpEvent<IResponse>> {
    const params = [user];
    return this.http.get<IResponse>(Service.appendParams(UserService.USER_EXISTS, params), this.getOptions());
  }
}
