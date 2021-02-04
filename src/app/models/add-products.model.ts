import {MedicineGroupModel} from './medicine-group.model';
import {CompanyModel} from './company.model';

export class ProductModel{
  public Id: string;
  public Name: string;
  public ApplicationFor: string;
  public ApplicationTo: string;
  public CostPrice: number;
  public SellingPrice: number;
  public Power: number;
  public Stock: number;
  public GroupId: string;
  public BrandId: string;
  public Group: MedicineGroupModel;
  public Brand: CompanyModel;
  public DiscountPrice: number;
  public VendorBarcodeNo: any;
}
