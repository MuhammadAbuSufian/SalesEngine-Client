import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from "../../../models/add-products.model";
import {ProductService} from "../../../services/product.service";
import {NotificationsService} from "angular2-notifications";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {GridRequestModel} from '../../../models/grid.request.model';
import {MedicineGroupModel} from '../../../models/medicine-group.model';
import {NgForm} from '@angular/forms';
import {JournalType} from '../../../models/journal-type';

@Component({
  templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit {
  @ViewChild('f') public form: NgForm;
  groupName: string = '';
  companyName: string = '';


  product: ProductModel = new ProductModel();
  productList: ProductModel [] = [];
  medicineGroupList: {Id: string, Name: string}[] = [];
  companyList: {Id: string, Name: string}[] = [];

  viewProduct: ProductModel = new ProductModel();
  create = true;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();

  constructor(
    private notificationService: NotificationsService,
    private productService: ProductService,
    private medicineGroupService: MedicineGroupService,
    private companyService: CompanyService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService

  ){}

  ngOnInit() {
    this.getProduct();
  }
  addTrue(){
    this.create = true;
    this.product = new ProductModel();
    this.viewProduct = new ProductModel();
    this.companyName = '';
    this.groupName = '';
  }
  searchCheck(){
    if(this.gridRequestModel.Keyword.length>5){
      this.getProduct();
    }
  }
  search(){
    this.gridRequestModel.Page = 1;
    this.getProduct();
  }

  getProduct() {
    this.productService.viewProduct(this.gridRequestModel).subscribe((res)=> {
      this.productList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
      if(this.gridRequestModel.Keyword.length>5){
        if(this.productList.length == 1){
          this.gridRequestModel.Keyword = '';
        }
      }
    })
  }

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroupTypeAhead(this.groupName).subscribe((res)=>{
      this.medicineGroupList = res;
    });
  }

  getCompany(){
    this.companyService.getCompanyTypeaheadData(this.companyName).subscribe((res)=>{
      this.companyList = res;
    });
  }


  saveNewProduct(f) {
    if(f.valid == true){
      console.log(this.product)
      if(this.product.DiscountPrice == undefined || this.product.DiscountPrice == 0
        || this.product.DiscountPrice <= this.product.CostPrice){
        this.product.DiscountPrice = this.product.SellingPrice;
      }
      this.productService.saveProduct(this.product).subscribe((res)=> {
        if (res == true) {
          this.notificationService.success('Success', res.message);
          this.getProduct();
          let form = <HTMLFormElement>document.getElementById('addProduct');
          form.reset();
          this.product = new ProductModel;
          this.groupName = '';
          this.companyName = '';
          console.log(this.form)
          this.create = true;
        }else {
          this.notificationService.alert('Failed', 'Something went wrong try again');
        }
      })
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }

  }


  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.Name == groupName)
          this.product.GroupId = medicineGroup.Id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.Name == companyName)
          this.product.BrandId = company.Id;
      })
    }

  }



  setView(index){
    this.viewProduct = this.productList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.product = this.productList[index];
    console.log(this.product)
    this.product.Name = this.productList[index].Name;
    this.product.GroupId = this.productList[index].GroupId;
    this.product.BrandId = this.productList[index].BrandId;
    this.groupName =  this.productList[index].Group.Name;
    this.companyName =  this.productList[index].Brand.Name;

    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.product = new ProductModel();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    // this.product = this.productList[index];
    // this.product.medicineName = this.productList[index].name;
    // this.product.groupId = this.productList[index].group.Id;
    // this.product.groupName = this.productList[index].group.Name;
    // this.product.companyName = this.productList[index].company.Name;
    // this.product.companyId = this.productList[index].company.Id;
    //
    // this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    // this.product.status = 0;
    //
    // this.productService.saveProduct(this.product).subscribe((res)=>{
    //   if(res.success == true){
    //     this.rerender();
    //     this.product = new ProductModel();
    //
    //     this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
    //     this.notificationService.success('Success', 'A record successfully deleted');
    //   }else{
    //     this.notificationService.error('Error', 'Please try again');
    //   }
    // });

  }


  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getProduct();
  }


}

