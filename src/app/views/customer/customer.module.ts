// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {CustomerComponent} from './customer.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerService} from '../../services/customer.service';


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    CustomMatrialModule,
    CustomerRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [
    CustomerComponent,
  ],
  providers:[
    CustomerService
  ]
})
export class CustomerModule { }
