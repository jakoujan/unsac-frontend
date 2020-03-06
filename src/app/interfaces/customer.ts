import { IRegion } from './region';

export interface ICustomer {
    id: number;
    business_name: string;
    tax_id: string;
    contact: string;
    telephone: string;
    email: string;
    street: string;
    internal_number: string;
    external_number: string;
    settlement: string;
    city: string;
    county: string;
    state: number;
    postal_code: string;
    country: number;
    region: IRegion;
}
