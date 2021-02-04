import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {NotificationsService} from "angular2-notifications";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {GridRequestModel} from '../../../models/grid.request.model';
import {CompanyModel} from '../../../models/company.model';


@Component({
  templateUrl: 'add-medicine-group.component.html'
})
export class AddMedicineGroup implements OnInit{

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  MedicineGroup: MedicineGroupModel = new MedicineGroupModel();
  medicineGroupList: MedicineGroupModel[] = [];
  viewGroup: MedicineGroupModel = new MedicineGroupModel();
  create = true;
  totalRecord = [];
  gridRequestModel: GridRequestModel = new GridRequestModel();

  constructor(
    private notificationService: NotificationsService,
    private medicineGroupService: MedicineGroupService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.getMedicineGroups();
  }
  addTrue(){
    this.create = true;
    this.MedicineGroup = new MedicineGroupModel();
    this.viewGroup = new MedicineGroupModel();
  }
  search(){
    this.gridRequestModel.Page = 1;
    this.getMedicineGroups();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup(this.gridRequestModel).subscribe((res)=>{
      this.medicineGroupList = res.Data;
      this.totalRecord = Array(res.Count).fill(0);
    });
  }

  saveMedicineGroup(f){
    if(f.valid == true){
      console.log(this.MedicineGroup)
      this.medicineGroupService.saveMedicineGroup(this.MedicineGroup).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', res.message);
          this.getMedicineGroups();
          let form = <HTMLFormElement>document.getElementById('addGroup');
          form.reset();
          this.MedicineGroup = new MedicineGroupModel;
        }
      });
    }else{
      this.notificationService.alert('Invalid Form', 'Please Fill All the Required Field')
    }
  }


  setView(index){
    this.viewGroup = this.medicineGroupList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.MedicineGroup = this.medicineGroupList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.MedicineGroup = new MedicineGroupModel();
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.MedicineGroup = this.medicineGroupList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.gridRequestModel.Page = number;
    this.getMedicineGroups();
  }

  // deleteRecord(){
  //   this.MedicineGroup.status = 0;
  //
  //   this.medicineGroupService.saveMedicineGroup(this.MedicineGroup).subscribe((res)=>{
  //     if(res.success == true){
  //       this.rerender();
  //       this.MedicineGroup = new MedicineGroupModel();
  //
  //       this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
  //       this.notificationService.success('Success', 'A record successfully deleted');
  //     }else{
  //       this.notificationService.error('Error', 'Please try again');
  //     }
  //   });
  //
  // }
}



