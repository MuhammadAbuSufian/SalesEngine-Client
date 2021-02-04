import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../models/add-products.model";
import {ProductService} from "../../services/product.service";
import {GridRequestModel} from '../../models/grid.request.model';
import {NotificationsService} from 'angular2-notifications';

@Component({
  templateUrl: 'inventory.component.html'
})
export class InventoryComponent  implements OnInit{
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();
  productList: ProductModel [] = [];
  product: ProductModel = new ProductModel();
  addStock: number = 0;
  printItem;
  printBarcode = true;
  constructor(    private productService: ProductService,
                  private notificationService: NotificationsService,
  ) { }

  ngOnInit() {
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

  searchCheck(){
    if(this.gridRequestModel.Keyword.length>5){
      this.getProduct();
    }
  }
  search(){
    this.gridRequestModel.Page = 1;
    this.getProduct();
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getProduct();
  }

  setUpdateStock(index){
    this.product = this.productList[index];
    this.product.Name = this.productList[index].Name;
    this.product.GroupId = this.productList[index].GroupId;
    this.product.BrandId = this.productList[index].BrandId;
  }

  updateStock(model){
    this.productService.updateStcok(this.product.Id, this.addStock).subscribe((res) => {
      if(res == true){
        this.notificationService.success('Success', "Updated");
        this.getProduct();
      }
      this.addStock = 0;
    })
    model.close();
  }

  print(index, printType){
    this.printBarcode = printType;
    this.printItem = this.productList[index];
    setTimeout(()=>{
      window.print();
    },300)
  }

}
