import {ProductModel} from '../models/add-products.model';

export class SaleDetailsViewModel {
  Amount: number;
  Discount: number;
  DiscountPercent: number;
  Quantity: number;
  SalesId: string;
  ProductId: string;
  Product: ProductModel;
}
