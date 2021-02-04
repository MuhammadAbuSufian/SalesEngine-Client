// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxBarcodeModule} from 'ngx-barcode';
import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import { JournalComponent } from './journal/journal.component';
import {JournalTypeComponent} from './journal/journal-type.component';
import {AccountSpendingComponent} from './spending/account-spending.component';
import {NgDatepickerModule} from 'ng2-datepicker';


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    CustomMatrialModule,
    AccountRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
    NgxBarcodeModule,
    NgDatepickerModule
  ],
  declarations: [
    AccountComponent,
    JournalComponent,
    JournalTypeComponent,
    AccountSpendingComponent
  ],
  providers:[
  ]
})
export class AccountModule { }
