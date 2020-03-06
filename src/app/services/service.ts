import { environment, constants } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { IUser } from '../interfaces/user';
import { Session } from '../interfaces/session';
import { IResponse } from '../interfaces/response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from './toast.service';

export enum ContentType {
    FORM_URLENCODED,
    JSON,
    XML
}

export class Service {

    protected static ERROR_NO_URL_DEFINED = 'URL no definida';
    protected http: HttpClient;
    protected ps: PersistenceService;
    protected spinner: NgxSpinnerService;
    protected toastService: ToastService;

    constructor(http: HttpClient, ps: PersistenceService, spinner: NgxSpinnerService, toastService: ToastService) {
        this.http = http;
        this.ps = ps;
        this.spinner = spinner;
        this.toastService = toastService;
    }

    public static appendParams(service: string, params: Array<string>): string {
        let url: string = environment.API_URL + service;
        params.forEach((param) => {
            url = url + '/' + param;
        });
        return url;
    }

    public static getApiUrl(service: string, params?: any): string {
        if (params) {
            let url = environment.API_URL + service + '?';
            const rowLen = params.length;
            params.forEach((param, i) => {
                if (rowLen !== i + 1) {
                    url = url + param.name + '=' + param.value + '&';
                } else {
                    url = url + param.name + '=' + param.value;
                }
            });
            return url;
        } else {
            return environment.API_URL + service;
        }
    }

    public static prepareFilter(filter: any) {
        return {
            filter
        };
    }

    public static prepareEntity(entity: any) {
        return {
            entity
        };
    }

    public getToken(): string {
        const session: Session = this.ps.get(constants.SESSION);
        return session.user.api_token;
    }

    public getOptions(user?: IUser, type?: ContentType): any {
        let headers = null;

        if (type === ContentType.FORM_URLENCODED) {
            headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.password)
            });
        }

        if (type === ContentType.JSON) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.password)
            });
        }
        const session: Session = this.ps.get(constants.SESSION, StorageType.SESSION);

        if (session) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + session.token
            });
        }

        if (user) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + user.api_token
            });
        }

        return {
            headers
        };
    }

    protected preparePromiseEntityPost(uri: string, entity: any, params?: any): Promise<IResponse> {
        this.spinner.show();
        return new Promise<IResponse>(resolve => {
            this.http.post<IResponse>(Service.getApiUrl(uri, params),
                Service.prepareEntity(entity), this.getOptions()).subscribe(response => {
                    this.spinner.hide();
                    resolve(response as unknown as IResponse);
                }, err => {
                    this.spinner.hide();
                    this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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
    protected preparePromiseEntityPut(uri: string, entity: any, params?: any): Promise<IResponse> {
        this.spinner.show();
        return new Promise<IResponse>(resolve => {
            this.http.put<IResponse>(Service.getApiUrl(uri, params),
                Service.prepareEntity(entity), this.getOptions()).subscribe(response => {
                    this.spinner.hide();
                    resolve(response as unknown as IResponse);
                }, err => {
                    this.spinner.hide();
                    this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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

    protected preparePromiseFilterPost(uri: string, entity: any, params?: any): Promise<IResponse> {
        this.spinner.show();
        return new Promise<IResponse>(resolve => {
            this.http.post<IResponse>(Service.getApiUrl(uri, params),
                Service.prepareFilter(entity), this.getOptions()).subscribe(response => {
                    this.spinner.hide();
                    resolve(response as unknown as IResponse);
                }, err => {
                    this.spinner.hide();
                    this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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

    protected preparePromiseGet(uri: string, params?: any): Promise<IResponse> {
        return new Promise<IResponse>(resolve => {
            this.http.get<IResponse>(Service.getApiUrl(uri, params), this.getOptions()).subscribe(response => {
                this.spinner.hide();
                resolve(response as unknown as IResponse);
            }, err => {
                this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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
