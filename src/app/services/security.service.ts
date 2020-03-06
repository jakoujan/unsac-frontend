import { Injectable } from '@angular/core';
import { Service, ContentType } from './service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user';
import { ToastService } from './toast.service';
import { PersistenceService } from 'angular-persistence';
import { Subject, Observable } from 'rxjs';
import { ISecureResponse } from '../interfaces/secure-response';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends Service {

  private static LOGIN = '/oauth/token';
  private static LOGOUT = 'api/security/logout';

  private accessorEmitter: Subject<IUser> = new Subject<IUser>();

  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService,
    protected toastService: ToastService,
    protected persistenceService: PersistenceService) {
    super(http, persistenceService, spinner, toastService);
  }

  public login(user: IUser, type: ContentType): Promise<ISecureResponse> {
    this.spinner.show();
    return new Promise<ISecureResponse>(resolve => {
      let body;
      if (type === ContentType.FORM_URLENCODED) {
        body = new HttpParams({
          fromObject: {
            grant_type: 'password',
            username: user.username,
            password: user.password
          }
        });
      } else if (type === ContentType.JSON) {
        body = {
          username: user.username,
          password: user.password
        }
      }

      this.http.post<ISecureResponse>(Service.getApiUrl(SecurityService.LOGIN), body, this.getOptions(undefined, type)).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as ISecureResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-danger text-light', delay: 10000 });
        const response: ISecureResponse = {
          access_token: null,
          expires_in: null,
          jti: null,
          refresh_token: null,
          scope: null,
          token_type: null,
          code: 505,
          fields: null,
          message: 'Error el servicio no esta disponible',
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
          message: 'Error el servicio no esta disponible',
          status: ''
        }
        resolve(response);
      });
    });
  }


}
