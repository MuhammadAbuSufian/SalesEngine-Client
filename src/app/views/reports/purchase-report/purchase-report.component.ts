


import {Component, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {NotificationsService} from "angular2-notifications";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {PurchaseService} from "../../../services/purchase.service";
import {GridRequestModel} from '../../../models/grid.request.model';
import {PurchaseViewModel} from '../../../view-model/purchase.view.model';

@Component({
  templateUrl: 'purchase-report.component.html'
})
export class PurchaseReportComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;

  purchaseList: PurchaseViewModel[] = [];
  viewPurchase: PurchaseViewModel = new PurchaseViewModel();
  details = false;
  start = new Date(Date.now());
  end = new Date(Date.now());
  totalRecord = [];
  totalPurchase = 0;
  purchaseCount = 0;

  gridRequestModel: GridRequestModel = new GridRequestModel();
  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private purchaseService: PurchaseService,
  ) {

  }

  ngOnInit() {
    this.getPurchase();
  }

  getPurchase() {
    const startDate = this.start.getFullYear() + '-' + (this.start.getMonth()+1) + '-' + this.start.getDate();
    const endDate = this.end.getFullYear() + '-' + (this.end.getMonth() + 1) + '-' + this.end.getDate();
    this.purchaseService.getPurchase(
      this.gridRequestModel, startDate, endDate).subscribe((res)=> {
      this.purchaseList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
      this.totalPurchase = res.Value;
      this.purchaseCount = res.Count;
    });
  }


  setView(index) {
    this.viewPurchase = this.purchaseList[index];
    this.details = true;
  }

  backToList() {
    this.viewPurchase = new PurchaseViewModel();
    this.details = false;

  }

  setDelete(index) {
    this.viewPurchase = this.purchaseList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }


  deleteRecord() {

    this.purchaseService.returnPurchase(this.viewPurchase.Id).subscribe((res) => {
      if (res.success === true) {
        this.viewPurchase = new PurchaseViewModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      } else {
        this.notificationService.error('Error', 'Please try again');
      }
    });
  }

  onPageChange(number: number) {

    this.gridRequestModel.Page = number;
    this.getPurchase();
  }

  search() {
    this.gridRequestModel.Page = 1;
    this.getPurchase();
  }
}

