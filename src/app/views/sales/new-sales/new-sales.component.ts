import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {CompanyModel} from "../../../models/company.model";
import {CartService} from "../../../services/cart.service";
import {SalesItemModel} from "../../../models/SalesItem.model";
import {SalesService} from "../../../services/sales.service";
import {NotificationsService} from 'angular2-notifications';
import {CustomerModel} from '../../../models/customer.model';
import {CustomerService} from '../../../services/customer.service';
import {AuthService} from '../../../services/auth.service';
import {StorageService} from '../../../services/storage.service';
import {AccountService} from '../../../services/account.service';

@Component({
  templateUrl: 'new-sales.component.html'
})
export class NewSalesComponent {

  medicineList: MedicineModel[] = []
  searchKey: string;
  groupKey: string;
  companyKey: string;
  groupName: string;
  companyName: string;
  customerKey: string;
  customerSearch: boolean = true;
  allowDue: boolean = false;
  soldTotalPreDiscount = 0;
  medicineGroupList: {Id: string, Name: string}[] = [];
  companyList:  {Id: string, Name: string}[] = [];
  customerList: CustomerModel[] = [];

  constructor(private medicineService: MedicineService,
              private medicineGroupService: MedicineGroupService,
              private companyService: CompanyService,
              public cartService: CartService,
              private salesService: SalesService,
              private notificationService: NotificationsService,
              private customerService: CustomerService,
              public storageService: StorageService,
              private accountService: AccountService
  ) {}


  ngOnInit() {
   this.getMedicine();
  }

  ngDoCheck(){
    let newTotal = 0;
    let newDiscount = 0;
    let preDiscountTotal = 0;
    this.cartService.salesItem.forEach((item)=>{
      preDiscountTotal = preDiscountTotal + (item.SellingPrice * item.Qty);
      if(this.storageService.userSession.Pharmacy){
        newTotal = newTotal + (item.SellingPrice * item.Qty);
      }
      if(this.storageService.userSession.SuperShop){
        newTotal = newTotal + (item.DiscountPrice * item.Qty);
      }
      newDiscount = newDiscount + (item.Discount * item.Qty);
    })
    this.cartService.total = newTotal;
    this.soldTotalPreDiscount = preDiscountTotal;
    this.cartService.totalDiscount = newDiscount;

    console.log('pre sold total' + this.cartService.soldTotalPreDiscount)
  }

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
  getCustomer(){
    console.log(this.customerKey)
    this.customerService.getCustomerTypeAhead(this.customerKey).subscribe((res)=> {
      this.customerList = res;
    })
  }

  onSelectionChangedMedicine(value){
    console.log('checkking----->'+value)
    this.medicineList.forEach((medicine)=>{
      if(medicine.Name == value){
        let salesItem: any = medicine;
        console.log(salesItem.Stock)
        if(salesItem.Stock < 1){
          this.notificationService.warn('Warning', 'Empty stock')
        }else{
          salesItem.Qty = 1;
          if(salesItem.Qty > salesItem.Stock){
            salesItem.Qty = salesItem.Stock;
          }
          salesItem.Discount = 0;
          salesItem.DiscountPer = 0;
          salesItem.Subtotal = salesItem.Qty * salesItem.SellingPrice;
          salesItem.staticCostPrice = salesItem.CostPrice;
          salesItem.staticSellPrice = salesItem.SellingPrice;
          let avoid = false;
          this.cartService.salesItem.forEach((item)=>{
            if(item.Id == medicine.Id){
              avoid = true;
            }
          })
          if(avoid == false){
            this.cartService.salesItem.push(salesItem);
          }
        }

        // this.searchKey = '';
      }
    });
    setTimeout(()=>{
      this.searchKey = '';
      this.medicineList = [];
    },500);
  }

  onSelectionChangedCustomer(value){
    this.customerList.forEach((customer)=>{
      if(customer.Name == value){
        this.cartService.customerId = customer.Id;
        this.customerSearch = false;
      }
    });
    // setTimeout(()=>{
    //   this.customerKey = '';
    //   this.customerList = [];
    // },500);
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

  newSale(modal){
    let outstandingAmount = (this.cartService.total - this.cartService.totalDiscount) - this.cartService.paidAmount;

    if(outstandingAmount <= 0 || this.allowDue){
      this.cartService.status = 1;
      this.cartService.due = 0;
      if(this.cartService.total > this.cartService.paidAmount){
        this.cartService.due = this.cartService.total- this.cartService.paidAmount
      }
      this.cartService.profit = this.cartService.total - this.totalCostPrice();
      this.salesService.newSale().subscribe((res) => {
        this.cartService.soldItems = this.cartService.salesItem;
        this.cartService.soldTotal = this.cartService.total;
        this.cartService.soldTotalPreDiscount = this.soldTotalPreDiscount;
        this.cartService.emptyCart();
        // this.notificationService.success('Success', res.msg)
        this.cartService.previousInvoiceNo = res;
        this.deleteCustomer();
        this.accountService.getBalence().subscribe(res =>{
          this.storageService.balence = res;
        })
      })
      this.printInvoice(modal);
    }else{
      this.notificationService.warn('Warn', 'Outstanding Balance Should Be Paid')
    }

  }

  totalCostPrice(){
    let costPriceTotal = 0;
    this.cartService.salesItem.forEach((item)=>{
      costPriceTotal = costPriceTotal + (item.CostPrice * item.Qty);
    })
    return costPriceTotal;
  }

  updateQty( currentItemId, newQty){
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){
        if(item.Stock < newQty){
          this.notificationService.warn('Warning', 'Empty stock');
          item.Qty = item.Stock;
        }else{
          item.Qty = newQty;
        }
      }
    })
  }

  updatePrice( currentItemId, newPrice){
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){

        newPrice = parseFloat(newPrice);

        if(newPrice >= item.CostPrice){
          let currentDiscount = item.staticSellPrice - newPrice;

          item.SellingPrice = parseFloat(newPrice);

          let currentPerDiscount = (currentDiscount * 100) / newPrice;
          item.DiscountPer = currentPerDiscount;
          item.Discount = currentDiscount;

        }

      }
    })
  }

  updatePriceOnFocusout( currentItemId, newPrice){
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){
        newPrice = parseFloat(newPrice)
        if(newPrice < item.CostPrice){
          let currentDsicount = (item.staticSellPrice - item.staticCostPrice);
          item.DiscountPer = currentDsicount * 100/item.staticSellPrice;
          item.Discount = currentDsicount;
          item.SellingPrice = item.CostPrice;

        }else{
          // item.SellingPrice = item.CostPrice;
        }

      }
    })
  }

  getSubtotal(price, qty){
    return (parseFloat(price)* parseFloat(qty));
  }


  updateDiscount( currentItemId, newPerDiscount ){
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){

        if(newPerDiscount > 0){
          let calculatedDiscount = (newPerDiscount / 100) * item.staticSellPrice;
          let newPrice = item.staticSellPrice - calculatedDiscount;
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
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){

        if( newPerDiscount <= 0 ){
          // let maxPrice = item.Discount + item.SellingPrice;
          item.SellingPrice = item.staticSellPrice;
          item.Discount = 0;
          item.DiscountPer = 0;
        }

        let maxDis = (item.staticSellPrice - item.staticCostPrice);
        let maxDisPer = maxDis * 100/item.staticSellPrice;
        if(newPerDiscount > maxDisPer){
          item.DiscountPer = maxDisPer;
          item.Discount = maxDis;
          item.SellingPrice = item.staticCostPrice;
        }

      }
    })
  }

  removeItem(currentItemId){
    let index = 0;
    this.cartService.salesItem.forEach((item)=>{
      if(item.Id == currentItemId){
        this.cartService.salesItem.splice(index, 1);
      }
      index++;
    })
  }


  deleteCustomer(){
    this.cartService.customerId = '';
    this.customerKey = '';
    this.customerSearch = true;
    this.allowDue = false;
  }

  toggleDue(){
    if(this.allowDue == true){
      this.allowDue = false;
    }else{
      this.allowDue = true;
    }
  }

  printInvoice(modal){
    modal.open()
    setTimeout(()=>{
      window.print()
    },1000)
  }

}
