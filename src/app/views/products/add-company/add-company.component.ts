import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from "angular2-notifications";
import {CompanyService} from "../../../services/company.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {NgxSmartModalService} from "ngx-smart-modal";
import {environment} from '../../../../environments/environment';
import {GridRequestModel} from '../../../models/grid.request.model';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../../models/add-products.model';





@Component({
  templateUrl: 'add-company.component.html'
})
export class AddCompanyComponent implements OnInit {
  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  company: CompanyModel = new CompanyModel();
  companyList: CompanyModel[] = [];
  viewCompany: CompanyModel = new CompanyModel();
  create = true;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
  ){

  }

  ngOnInit() {
    this.getCompany();
  }
  addTrue(){
    this.create = true;
    this.company = new CompanyModel();
  }
  search(){
    this.gridRequestModel.Page = 1;
    this.getCompany();
  }
  getCompany(){
    this.companyService.getCompany(this.gridRequestModel).subscribe((res)=>{
      this.companyList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
    })
  }



  saveNewCompany(f){

    if(f.valid == true){
      this.companyService.saveCompany(this.company).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', res.message);
          let form = <HTMLFormElement>document.getElementById('addCompany');
          form.reset();
          this.company = new CompanyModel;
          this.create = true;
        }
      });
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }

  }

  setView(index){
    this.viewCompany = this.companyList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.company = this.companyList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.company = new CompanyModel;
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.company = this.companyList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    // this.company.status = 0;

    this.companyService.saveCompany(this.company).subscribe((res)=>{
      if(res.success == true){
        this.company = new CompanyModel;

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      }else{
        this.notificationService.error('Error', 'Please try again');
      }
    });

  }


  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getCompany();
  }

}

