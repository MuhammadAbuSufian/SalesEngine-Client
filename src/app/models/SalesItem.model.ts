import {MedicineModel} from "./medicine.model";

export class SalesItemModel extends MedicineModel{
  Qty: number ;
  Discount: number;
  DiscountPer: number;
  Subtotal: number ;
  staticCostPrice: number;
  staticSellPrice: number;
}
