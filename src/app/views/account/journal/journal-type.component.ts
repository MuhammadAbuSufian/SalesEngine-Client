import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {GridRequestModel} from '../../../models/grid.request.model';
import {NotificationsService} from 'angular2-notifications';
import {HttpClient} from '@angular/common/http';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {JournalType} from '../../../models/journal-type';
import {AccountService} from '../../../services/account.service';
import {Journal} from '../../../models/journal.model';

@Component({
  templateUrl: 'journal-type.component.html'
})
export class JournalTypeComponent implements OnInit {
  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  journalType: JournalType = new JournalType();
  journalTypeList: JournalType[] = [];
  viewJournalType: JournalType = new JournalType();
  create = true;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationsService,
    public ngxSmartModalService: NgxSmartModalService
  ){

  }

  ngOnInit() {
    this.getJournalType();
  }

  addTrue(){
    this.create = true;
    this.journalType = new JournalType();
  }


  search(){
    this.gridRequestModel.Page = 1;
    this.getJournalType();
  }
  getJournalType(){
    this.journalTypeList = [];
    this.accountService.getJournalType(this.gridRequestModel).subscribe((res)=>{
      this.journalTypeList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
    })
  }



  saveJournalType(f){
    if(f.valid == true){
      this.accountService.saveJournalType(this.journalType).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', res.message);
          let form = <HTMLFormElement>document.getElementById('addCompany');
          form.reset();
          this.journalType = new JournalType();
          this.create = true;
          this.getJournalType();
        }
      });
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }
  }

  setView(index){
    this.viewJournalType = this.journalTypeList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.journalType = this.journalTypeList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.journalType = new JournalType();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.journalType = this.journalTypeList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    this.accountService.saveJournalType(this.journalType).subscribe((res)=>{
      if(res.success == true){
        this.journalType = new JournalType();

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
    this.getJournalType();
  }
}

