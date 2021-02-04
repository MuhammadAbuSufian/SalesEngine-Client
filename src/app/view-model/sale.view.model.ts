import {SaleDetailsViewModel} from './sale-details.view.model';

export class SaleViewModel {
  InvoiceNo: string;
  Commint: string;
  Amount: number;
  Discount: number;
  DiscountPercent: number;
  SalesDetails: SaleDetailsViewModel[] = [];
  Created: any;
  Customer: any;
  Due: number;
}
