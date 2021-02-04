import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {GridRequestModel} from '../../../models/grid.request.model';
import {AccountService} from '../../../services/account.service';
import {NotificationsService} from 'angular2-notifications';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Journal} from '../../../models/journal.model';
import {JournalType} from '../../../models/journal-type';
import {appPermission} from '../../../../environments/permissions';
import {StorageService} from '../../../services/storage.service';
@Component({
  templateUrl: 'journal.component.html'
})
export class JournalComponent  implements OnInit{

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  journal: Journal = new Journal();
  journalList: Journal[] = [];
  journalTypes: JournalType[] = [];
  viewJournal: Journal = new Journal();
  create = true;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();
  currentJournalIndex = 0;
  accountManegment = false;
  constructor(
    private accountService: AccountService,
    private notificationService: NotificationsService,
    public ngxSmartModalService: NgxSmartModalService,
    public storageService: StorageService
  ){

  }

  ngOnInit() {
    this.getJournalTypeDropdown();
    this.setAccountManegmentPermission();
  }
  setAccountManegmentPermission(){
    if(this.storageService.permissions.length>0){
      this.accountManegment = this.storageService.hasPermission(appPermission.journalManegment);
      this.getJournal();
    }else{
      setTimeout(()=>{
        this.setAccountManegmentPermission();
      },300)
    }
  }

  search(){
    this.gridRequestModel.Page = 1;
    this.getJournal();
  }


  getJournal(){
    this.journalList = [];
    this.accountService.getJournal(this.gridRequestModel, this.accountManegment).subscribe((res)=>{
      this.journalList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
    })
  }

  getJournalTypeDropdown(){
    this.accountService.getJournalTypeDropdown().subscribe((res)=>{
      this.journalTypes = res;
    })
  }

  saveJournal(f){
    if(f.valid == true){
      this.accountService.saveJournal(this.journal).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', res.message);
          let form = <HTMLFormElement>document.getElementById('addCompany');
          form.reset();
          this.journal = new Journal();
          this.create = true;
          this.getJournal();
        }
      });
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }
  }

  setView(index){
    this.viewJournal = this.journalList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.journal = this.journalList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.journal = new Journal();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }
  addTrue(){
    this.create = true;
    this.journal = new Journal();
  }



  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getJournal();
  }

  openDeleteDelete(index){
    this.currentJournalIndex = index;
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    const selectedJournal = this.journalList[this.currentJournalIndex];
    this.accountService.deleteJournal(selectedJournal.Id).subscribe((res)=>{
      if(res == true){
        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
        this.getJournal();
      }else{
        this.notificationService.error('Failed', 'Please try again');
      }
    });
  }

  openApproveConfirmationModal(index){
    this.currentJournalIndex = index;
    this.ngxSmartModalService.getModal('approveConfirmationModal').open();
  }

  approveJournal(){
    const selectedJournal = this.journalList[this.currentJournalIndex];
    this.accountService.approveJournal(selectedJournal.Id).subscribe((res)=>{
      if(res == true){
        this.ngxSmartModalService.getModal('approveConfirmationModal').close();
        this.notificationService.success('Success', 'A journal approved');
        this.getJournal();
      }else{
        this.notificationService.error('Failed', 'Please try again');
      }
    });
  }
  openPaidConfirmationModal(index){
    this.currentJournalIndex = index;
    this.ngxSmartModalService.getModal('paidConfirmationModal').open();
  }

  paidJournal(){
    const selectedJournal = this.journalList[this.currentJournalIndex];
    this.accountService.paidJournal(selectedJournal.Id, selectedJournal.Amount).subscribe((res)=>{
      if(res == true){
        this.ngxSmartModalService.getModal('paidConfirmationModal').close();
        this.notificationService.success('Success', 'A journal paid');
        this.getJournal();
      }else{
        this.notificationService.error('Failed', 'Please try again');
      }
    });
  }
}
