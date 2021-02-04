


import {Component, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {NotificationsService} from "angular2-notifications";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {SalesService} from "../../../services/sales.service";
import {SaleModel} from "../../../models/saleModel";
import {GridRequestModel} from '../../../models/grid.request.model';
import {SaleViewModel} from '../../../view-model/sale.view.model';
import {StorageService} from '../../../services/storage.service';
import {AccountService} from '../../../services/account.service';
import {appPermission} from '../../../../environments/permissions';
@Component({
  templateUrl: 'sales-report.component.html',
  styleUrls: ['sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  salesList: SaleViewModel[] = [];
  viewSale: SaleViewModel = new SaleViewModel();
  details: boolean = false;
  totalSales: number = 0;
  salesCount: number = 0;
  totalDue: number = 0;
  dueCount: number = 0;
  profit: number = 0;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();
  due: boolean = false;
  date:any;

  start = new Date(Date.now());
  end = new Date(Date.now());
  appPermission = appPermission;
  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private salesService: SalesService,
    public storageService: StorageService,
    private accountService: AccountService
  ){

  }

  ngOnInit() {
    this.getSales();
  }

  getSales(){
    let startDate = this.start.getFullYear() + '-' + (this.start.getMonth()+1) + '-' + this.start.getDate();
    let endDate = this.end.getFullYear() + '-' + (this.end.getMonth()+1) + '-' + (this.end.getDate());
    this.salesService.getSales(this.gridRequestModel, startDate, endDate).subscribe((res)=>{
      this.salesList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
      this.totalSales = res.TotalAmount;
      this.totalDue = res.TotalDue;
      this.dueCount = res.DueCount;
      this.profit = res.Profit;
      this.salesCount = res.Count;
    })
  }

  search(){
    this.gridRequestModel.Page = 1;
    this.getSales();
  }

  setView(index){
    this.viewSale = this.salesList[index];
    this.details = true;
    if(this.viewSale.Due>0){
      this.due = true;
    }
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getSales();
  }


  backToList(){
    this.viewSale = new SaleViewModel();
    this.details = false;

  }



  deleteRecord() {
    this.salesService.returnSale(this.viewSale.InvoiceNo).subscribe((res) => {
      // if (res == true) {
        this.viewSale = new SaleViewModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
        this.getSales();
        this.accountService.getBalence().subscribe(res =>{
          this.storageService.balence = res;
        })
      // } else {
      //   this.notificationService.error('Error', 'Please try again');
      // }
    });
  }

  setDelete(index){
    this.viewSale = this.salesList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  updateDue(){
    this.salesService.dueUpdate(this.viewSale.InvoiceNo, this.viewSale.Due).subscribe(res => {
      if(res == true){
        this.notificationService.success('Successfully update due')
      }else{
        this.notificationService.warn('Failed, Due should be less than previous due. try again ')
      }
    })
  }
}

