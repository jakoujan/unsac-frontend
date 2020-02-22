import { Component, OnInit } from '@angular/core';
import { ICustomer } from "../../../../interfaces/customer";
import { EMovement } from "../../../../enums/movement.enum";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomerFilter } from 'src/app/filters/customer-filter';
import { IResposeData } from 'src/app/interfaces/response-data';
import { DialogService } from 'src/app/components/ui/dialogs/dialog.service';
import { constants } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  response: IResposeData<Array<ICustomer>> = {
    current_page: 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 30,
    to: 0,
    total: 0
  };

  filter: ICustomerFilter = {
    entity: {
      id: null,
      business_name: null,
      tax_id: null,
      contact: null,
      telephone: null,
      email: null,
      street: null,
      internal_number: null,
      external_number: null,
      settlement: null,
      city: null,
      county: null,
      state: null,
      postal_code: null,
      country: null,
      status: null,
    },
    startDate: null,
    endDate: null,
    hidden: true,
    page: 1,
    rows: 20
  }
  hideFilter: boolean = true;
  editMovement: EMovement = EMovement.EDIT;

  constructor(private modalService: NgbModal, private customerService: CustomerService, private dialog: DialogService) { }

  ngOnInit() {
    this.setFilter();
  }

  public newRecord() {
    const customer: ICustomer = {
      id: 0,
      business_name: null,
      tax_id: null,
      contact: null,
      telephone: null,
      email: null,
      street: null,
      internal_number: null,
      external_number: null,
      settlement: null,
      city: null,
      county: null,
      state: null,
      postal_code: null,
      country: null,
      status: 99,
    };

    this.openForm(customer, EMovement.NEW);
  }

  public edit(customer: ICustomer) {
    this.openForm(customer, EMovement.EDIT);
  }

  public pageChange(page: number) {
    this.filter.page = page;
    this.setFilter();
  }

  setFilter() {
    this.customerService.filter(this.filter).then(response => {
      this.response = response.fields.response_data;
    });
  }

  public delete(customer: ICustomer) {

    this.dialog.confirm(constants.CONFIRMATION_DIALOG_TITLE, 'Realmente desea eliminar a este cliente: ' + customer.business_name + '?')
      .then((confirmed) => {
        if (confirmed) {
          this.customerService.delete(customer).then(response => {
            this.setFilter();
            this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
          });
        }
      });
  }

  public toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  public openForm(customer: ICustomer, movement: EMovement) {
    const modalRef = this.modalService.open(CustomerFormComponent, { size: 'xl', centered: true, scrollable: true });
    modalRef.componentInstance.customer = customer;
    modalRef.result.then(cust => {
      this.customerService.save(cust).then(response => {
        if (movement === EMovement.NEW) {
          this.response.data.push(cust);
        } else if (movement === EMovement.EDIT) {
          customer = cust;
        }
        this.dialog.show(constants.CONFIRMATION_DIALOG_TITLE, response.message);
      });
    });
  }

}
