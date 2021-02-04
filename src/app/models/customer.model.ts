import {BaseModel} from './base.model';

export class CustomerModel extends BaseModel{
  Name: string;
  Phone: string;
  Address: string;
  Active: boolean;
}
