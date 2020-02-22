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



  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private persistenceService: PersistenceService,
    private toastService: ToastService) {
    super();
    this.setPersistentService(this.persistenceService);
  }

  public filter(filter: IUserFilter): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      const params = [{
        name: 'page',
        value: filter.page
      }];
      this.http.post<IResponse>(Service.getApiUrl(UserService.USER_LIST, params), Service.prepareFilter(filter), this.getOptions()).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as IResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-danger text-light', delay: 10000 });
        const response: IResponse = {
          code: 505,
          fields: null,
          message: "Error el servicio no esta disponible",
          status: ''
        }
        resolve(response);
      });
    });
  }

  public save(user: IUser): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      this.http.post<IResponse>(Service.getApiUrl(UserService.USER_SAVE), Service.prepareEntity(user), this.getOptions()).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as IResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-danger text-light', delay: 10000 });
        const response: IResponse = {
          code: 505,
          fields: null,
          message: "Error el servicio no esta disponible",
          status: ''
        }
        resolve(response);
      });
    });
  }

  public delete(user: IUser): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {

      this.http.post<IResponse>(Service.getApiUrl(UserService.USER_DELETE), Service.prepareEntity(user), this.getOptions()).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as IResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-danger text-light', delay: 10000 });
        const response: IResponse = {
          code: 505,
          fields: null,
          message: "Error el servicio no esta disponible",
          status: ''
        }
        resolve(response);
      });
    });
  }

  public isNameExists(user: string): Observable<HttpEvent<IResponse>> {
    const params = [user];
    return this.http.get<IResponse>(Service.appendParams(UserService.USER_EXISTS, params), this.getOptions());
  }
}
