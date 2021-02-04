import {MedicineGroupModel} from "./medicine-group.model";
import {CompanyModel} from "./company.model";

export class MedicineModel {
  public Id: string;
  public Name: string;
  public ApplicationFor: string;
  public ApplicationTo: string;
  public CostPrice: number;
  public SellingPrice: number;
  public DiscountPrice: number;
  public Power: number;
  public Stock: number;
  public GroupId: string;
  public BrandId: string;
  public Group: MedicineGroupModel;
  public Brand: CompanyModel;
  public BarCodeNo: number;
  public VendorBarcodeNo: number;
}
