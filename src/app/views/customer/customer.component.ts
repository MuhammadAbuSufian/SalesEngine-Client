import {Component, OnInit} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {CustomerModel} from '../../models/customer.model';
import {GridRequestModel} from '../../models/grid.request.model';
import {CustomerService} from '../../services/customer.service';
import {MedicineGroupModel} from '../../models/medicine-group.model';

@Component({
  templateUrl: 'customer.component.html'
})
export class CustomerComponent  implements OnInit{

  create: boolean = true;
  customer: CustomerModel = new CustomerModel();
  customerList: CustomerModel[] = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();
  totalRecord = [];

  constructor(
                  private notificationService: NotificationsService,
                  private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomer();
  }
  addTrue(){
    this.create = true;
    this.customer = new CustomerModel();
  }
  search(){
    this.gridRequestModel.Page = 1;
    this.getCustomer();
  }

  saveNewCustomer(form){
    if(form.valid == true){
      this.customerService.saveCustomer(this.customer).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', res.message);
          let form = <HTMLFormElement>document.getElementById('addCustomer');
          form.reset();
          this.customer = new CustomerModel();
          this.create = true;
          this.getCustomer();
        }
      });
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }
  }

  getCustomer(){
    this.customerService.getCustomer(this.gridRequestModel).subscribe((res)=> {
      this.customerList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
    })
  }

  setEdit(index){
    this.customer = this.customerList[index];
    this.create = false;
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getCustomer();
  }
}
