import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from 'angular2-notifications';
import {PurchaseCartService} from "../../../services/purchase.cart.service";
import {PurchaseService} from "../../../services/purchase.service";
import {StorageService} from '../../../services/storage.service';
import {AccountService} from '../../../services/account.service';

@Component({
  templateUrl: 'new-purchase.component.html'
})
export class NewPurchaseComponent {

  medicineList: MedicineModel[] = []
  searchKey: string;
  groupKey: string;
  companyKey: string;
  groupName: string;
  companyName: string;
  printItems=[];
  printItem;
  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];


  constructor(private medicineService: MedicineService,
              private medicineGroupService: MedicineGroupService,
              private companyService: CompanyService,
              public cartService: PurchaseCartService,
              private purchaseService: PurchaseService,
              private notificationService: NotificationsService,
              public storageService: StorageService,
              private accountService: AccountService
  ) {}


  ngOnInit() {
    this.getMedicine();
  }
  updateCart(){
    let newTotal = 0;
    let newDiscount = 0;
    this.cartService.purchaseItem.forEach((item)=>{
      newTotal = newTotal + (item.CostPrice * item.Qty);
      newDiscount = newDiscount + (item.Discount * item.Qty);
    })

    this.cartService.total = newTotal;
    this.cartService.totalDiscount = newDiscount;
  }

  // getMedicine(){
  //   this.medicineService.viewMedicines(this.searchKey, this.groupKey, this.companyKey).subscribe((res)=> {
  //     this.medicineList = res;
  //   })
  // }
  getMedicine(){
    this.medicineService.viewMedicines(this.searchKey, this.groupKey, this.companyKey).subscribe((res)=> {
      this.medicineList = res;
      if(this.searchKey.length>5 && this.medicineList.length == 1){
        this.onSelectionChangedMedicine(this.medicineList[0].Name)
        this.medicineList = [];
        this.searchKey = '';
      }
    })
  }
  getMedicineCheck(){
    if(this.searchKey.length>5){
      this.getMedicine();
    }
  }
  onSelectionChangedMedicine(value){
    console.log(value)
    this.medicineList.forEach((medicine)=>{
      if(medicine.Name == value){
        let salesItem: any = medicine;
        salesItem.Qty = 1;
        salesItem.Discount = 0;
        salesItem.DiscountPer = 0;
        salesItem.Subtotal = salesItem.Qty * salesItem.CostPrice;

        let avoid = false;
        this.cartService.purchaseItem.forEach((item)=>{
          if(item.Id == medicine.Id){
            avoid = true;
          }
        })
        if(avoid == false){
          this.cartService.purchaseItem.push(salesItem);
        }
        // this.searchKey = '';
      }
    });
    setTimeout(()=>{
      this.searchKey = '';
      this.updateCart();
    },500);
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




  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.Name == groupName)
          this.groupKey = medicineGroup.Id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.Name == companyName)
          this.companyKey = company.Id;
      })
    }

  }

  newPurchase(){
    this.cartService.status = 1;
    this.purchaseService.newPurchase().subscribe((res) => {
      this.printItems = this.cartService.purchaseItem;
      this.cartService.emptyCart();
      this.notificationService.success('Success', res.msg)
      this.cartService.previousInvoiceNo = res.InvoiceId;
      this.accountService.getBalence().subscribe(res =>{
        this.storageService.balence = res;
      })
    })
  }

  updateQty( currentItemId, newQty){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){
        item.Qty = newQty;
      }
    })
    this.updateCart();
  }

  updatePrice( currentItemId, newPrice){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){

        // if(newPrice >= item.CostPrice){
          let currentDiscount = item.CostPrice - newPrice;

          item.CostPrice = parseFloat(newPrice);

          let totalDiscount = currentDiscount + item.Discount;
          let maxPrice = totalDiscount +  item.CostPrice;
          let currentPerDiscount = (totalDiscount * 100) / maxPrice;
          item.DiscountPer = currentPerDiscount;
          item.Discount = totalDiscount;

        // }
        // else{
        //   currentDiscount = item.sellingPrice - item.costPrice;
        //   item.sellingPrice = newPrice;
        // }

      }
    })
    this.updateCart();
  }

  updatePriceOnFocusout( currentItemId, newPrice){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){

        // if(newPrice < item.CostPrice){
          let currentDiscount = item.SellingPrice - item.CostPrice;

          item.SellingPrice = item.CostPrice;

          let totalDiscount = currentDiscount + item.Discount;
          let maxPrice = totalDiscount +  item.SellingPrice;
          let currentPerDiscount = (totalDiscount * 100) / maxPrice;
          item.DiscountPer = currentPerDiscount;
          item.Discount = totalDiscount;

        // }

      }
    })
    this.updateCart();
  }


  updateDiscount( currentItemId, newPerDiscount ){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){

        if(newPerDiscount > 0){
          let maxPrice = item.Discount + item.SellingPrice;
          let calculatedDiscount = (newPerDiscount / 100) * maxPrice;
          let newPrice = maxPrice - calculatedDiscount;
          if(newPrice >= item.CostPrice){
            item.SellingPrice = newPrice;
            item.Discount = calculatedDiscount;
            item.DiscountPer = newPerDiscount;
          }
        }

      }
    })
  }


  updateDiscountOnFocusout( currentItemId, newPerDiscount ){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){

        if( newPerDiscount <= 0 ){
          let maxPrice = item.Discount + item.SellingPrice;
          item.SellingPrice = maxPrice;
          item.Discount = 0;
          item.DiscountPer = 0;
        }

      }
    })
  }

  removeItem(currentItemId){
    let index = 0;
    this.cartService.purchaseItem.forEach((item)=>{
      if(item.Id == currentItemId){
        this.cartService.purchaseItem.splice(index, 1);
      }
      index++;
    })
  }


  print(index){
    this.printItem = this.printItems[index];
    setTimeout(()=>{
      window.print();
    },300)
  }





}
