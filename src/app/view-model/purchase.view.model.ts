import {SaleDetailsViewModel} from './sale-details.view.model';

export  class PurchaseViewModel {
  Id: string;
  InvoiceNo: string;
  Commint: string;
  Amount: number;
  PurchaseDetails: SaleDetailsViewModel[] = [];
}
