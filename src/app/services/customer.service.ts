import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResponse } from '../interfaces/response';
import { ICustomerFilter } from '../filters/customer-filter';
import { ICustomer } from '../interfaces/customer';
import { PersistenceService } from 'angular-persistence';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends Service {

  private static CUSTOMER_LIST = 'api/customers/list';
  private static CUSTOMER_SAVE = '/api/customers/save';
  private static CUSTOMER_DELETE = '/api/customers/delete';


  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private persistenceService: PersistenceService,
    private toastService: ToastService) {
    super();
    this.setPersistentService(this.persistenceService);
  }

  public filter(filter: ICustomerFilter): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      const params = [{
        name: 'page',
        value: filter.page
      }];
      this.http.post<IResponse>(Service.getApiUrl(CustomerService.CUSTOMER_LIST, params), Service.prepareFilter(filter), this.getOptions()).subscribe(response => {
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

  public save(customer: ICustomer): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      this.http.post<IResponse>(Service.getApiUrl(CustomerService.CUSTOMER_SAVE), Service.prepareEntity(customer), this.getOptions()).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as IResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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

  public delete(customer: ICustomer): Promise<IResponse> {
    this.spinner.show();
    return new Promise<IResponse>(resolve => {
      this.http.post<IResponse>(Service.getApiUrl(CustomerService.CUSTOMER_DELETE), Service.prepareEntity(customer), this.getOptions()).subscribe(response => {
        this.spinner.hide();
        resolve(response as unknown as IResponse);
      }, err => {
        this.spinner.hide();
        this.toastService.show('Error al procesar la petición', { classname: 'bg-warning text-light', delay: 10000 });
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
