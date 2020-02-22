import { environment, constants } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { IUser } from '../interfaces/user';
import { Session } from '../interfaces/session';

export class Service {

    protected static ERROR_NO_URL_DEFINED = 'URL no definida';

    private ps: PersistenceService;

    public setPersistentService(persistenceService: PersistenceService) {
        this.ps = persistenceService;
    }

    public static appendParams(service: string, params: Array<string>): string {
        let url: string = environment.API_URL + service;
        params.forEach((param) => {
            url = url + '/' + param;
        });
        return url;
    }

    public static getApiUrl(service: string, params: any = undefined): string {
        if (params === undefined) {
            return environment.API_URL + service;
        } else {
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
        }
    }

    public static prepareFilter(filter: any) {
        return {
            filter: filter
        };
    }

    public static prepareEntity(entity: any) {
        return {
            entity: entity
        };
    }

    public getToken(): string {
        const session: Session = this.ps.get(constants.SESSION);
        return session.user.api_token;
    }

    public getOptions(user: IUser = undefined): any {
        // public getOptions(): any {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        const session: Session = this.ps.get(constants.SESSION, StorageType.SESSION);

        if (session !== undefined) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + session.token,
                'Access-Control-Allow-Origin': '*',
                'XSRF-TOKEN': session.csrf
            });
        }

        if (user !== undefined) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + user.api_token
            });
        }

        return {
            headers: headers
        }
    }

}
