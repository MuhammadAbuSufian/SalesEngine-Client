import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {GridRequestModel} from '../../../models/grid.request.model';
import {AccountService} from '../../../services/account.service';
import {NotificationsService} from 'angular2-notifications';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Journal} from '../../../models/journal.model';
import {JournalType} from '../../../models/journal-type';
import {StorageService} from '../../../services/storage.service';
@Component({
  templateUrl: 'account-spending.component.html'
})
export class AccountSpendingComponent  implements OnInit{

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  journalList: Journal[] = [];
  journalTypes: JournalType[] = [];
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();
  currentJournalIndex = 0;
  totalSpending = 0;
  start = new Date(Date.now());
  end = new Date(Date.now());
  constructor(
    private accountService: AccountService,
    private notificationService: NotificationsService,
    public ngxSmartModalService: NgxSmartModalService,
    public storageService: StorageService
  ){

  }

  ngOnInit() {
    this.getJournalTypeDropdown();
    this.getJournal();
  }

  search(){
    this.gridRequestModel.Page = 1;
    this.getJournal();
  }

  getJournal(){
    this.journalList = [];
    let startDate = this.start.getFullYear() + '-' + (this.start.getMonth()+1) + '-' + this.start.getDate();
    let endDate = this.end.getFullYear() + '-' + (this.end.getMonth()+1) + '-' + (this.end.getDate());
    this.accountService.getJournalByDate(this.gridRequestModel, startDate, endDate).subscribe((res)=>{
      this.journalList = res.Data;
      this.totalSpending = res.Value;
      this.totalRecord = Array(res.Count).fill(0);
    })
  }

  getJournalTypeDropdown(){
    this.accountService.getJournalTypeDropdown().subscribe((res)=>{
      this.journalTypes = res;
    })
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getJournal();
  }

}
