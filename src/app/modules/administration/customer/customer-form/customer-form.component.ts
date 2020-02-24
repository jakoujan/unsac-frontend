import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from 'src/app/interfaces/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { STATES, COUNTRIES } from 'src/app/catalogs/catalogs';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  @Input() customer: ICustomer;

  form: FormGroup;
  generalDataForm: FormGroup;
  addressForm: FormGroup;
  states: Array<Item> = STATES;
  countries: Array<Item> = COUNTRIES;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    if (this.customer) {
      this.generalDataForm = this.fb.group({
        business_name: [this.customer.business_name, Validators.required],
        telephone: [this.customer.telephone, Validators.required],
        contact: [this.customer.contact, Validators.required],
        email: [this.customer.email, Validators.compose([Validators.required, Validators.email])],
        tax_id: [this.customer.tax_id, Validators.required]
      });
      this.addressForm = this.fb.group({
        street: [this.customer.street, Validators.required],
        internal_number: [this.customer.internal_number],
        external_number: [this.customer.external_number, Validators.required],
        settlement: [this.customer.settlement, Validators.required],
        city: [this.customer.city, Validators.required],
        county: [this.customer.county, Validators.required],
        state: [this.customer.state, Validators.required],
        postal_code: [this.customer.postal_code, Validators.required],
        country: [this.customer.country, Validators.required]
      });
      this.form = this.fb.group({
        generalData: this.generalDataForm,
        addressData: this.addressForm
      });
    } else {
      throw new Error('Datos del cliente no definidos');
    }
  }

  public save() {
    this.customer.business_name = this.generalDataForm.controls.business_name.value;
    this.customer.tax_id = this.generalDataForm.controls.tax_id.value;
    this.customer.contact = this.generalDataForm.controls.contact.value;
    this.customer.telephone = this.generalDataForm.controls.telephone.value;
    this.customer.email = this.generalDataForm.controls.email.value;
    this.customer.street = this.addressForm.controls.street.value;
    this.customer.internal_number = this.addressForm.controls.internal_number.value;
    this.customer.external_number = this.addressForm.controls.external_number.value;
    this.customer.settlement = this.addressForm.controls.settlement.value;
    this.customer.city = this.addressForm.controls.city.value;
    this.customer.county = this.addressForm.controls.county.value;
    this.customer.state = this.addressForm.controls.state.value;
    this.customer.postal_code = this.addressForm.controls.postal_code.value;
    this.customer.country = this.addressForm.controls.country.value;
    this.activeModal.close(this.customer);
  }
}
