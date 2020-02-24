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


  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService, protected persistenceService: PersistenceService,
              protected toastService: ToastService) {
    super(http, persistenceService, spinner, toastService);
  }

  public filter(filter: ICustomerFilter): Promise<IResponse> {
    const params = [{
      name: 'page',
      value: filter.page
    }];
    return this.preparePromiseFilterPost(CustomerService.CUSTOMER_LIST, filter, params);
  }

  public save(customer: ICustomer): Promise<IResponse> {
    return this.preparePromiseEntityPost(CustomerService.CUSTOMER_SAVE, customer);
  }

  public delete(customer: ICustomer): Promise<IResponse> {
    return this.preparePromiseEntityPost(CustomerService.CUSTOMER_DELETE, customer);
  }
}
