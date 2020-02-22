import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user';
import { ToastService } from './toast.service';
import { PersistenceService } from 'angular-persistence';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends Service {

  private static LOGIN = 'api/security/login';
  private static LOGOUT = 'api/security/logout';

  private accessorEmitter: Subject<IUser> = new Subject<IUser>();

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastService: ToastService,
    private persistenceService: PersistenceService) {
    super();
    this.setPersistentService(this.persistenceService);
  }

  public login(user: IUser): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      this.http.post<IResponse>(Service.getApiUrl(SecurityService.LOGIN), user, this.getOptions()).subscribe(response => {
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

  public setUserData(): Observable<IUser> {
    return this.accessorEmitter.asObservable();
  }

  public updateUserData(user: IUser) {
    this.accessorEmitter.next(user);
  }

  public logout(user: IUser): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      this.http.post<IResponse>(Service.getApiUrl(SecurityService.LOGOUT), user, this.getOptions()).subscribe(response => {
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


}
