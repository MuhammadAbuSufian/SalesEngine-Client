import {MedicineModel} from "./medicine.model";

export class PurchaseItemModel extends MedicineModel{
  Qty: number ;
  Discount: number;
  DiscountPer: number;
  Subtotal: number ;
}
