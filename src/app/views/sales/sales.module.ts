// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NewSalesComponent} from "./new-sales/new-sales.component";
import {SalesRoutingModule} from "./sales-routing.module";
import {CustomMatrialModule} from "../../custom-matrial.module";
import {FormsModule} from "@angular/forms";
import {MedicineService} from "../../services/medicine.service";
import {CompanyService} from "../../services/company.service";
import {MedicineGroupService} from "../../services/medicine-group.service";
import {SalesService} from "../../services/sales.service";
import {CustomerService} from '../../services/customer.service';
import {NgxSmartModalModule} from 'ngx-smart-modal';


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    CustomMatrialModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
  ],
  declarations: [
    NewSalesComponent
  ],
  providers: [
    MedicineService,
    CompanyService,
    MedicineGroupService,
    SalesService,
    CustomerService
  ]
})
export class SalesModule { }
