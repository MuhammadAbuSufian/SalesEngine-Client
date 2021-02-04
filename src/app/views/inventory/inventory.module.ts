// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CustomMatrialModule} from "../../custom-matrial.module";
import {InventoryRoutingModule} from "./inventory-routing.module";
import {InventoryComponent} from "./inventory.component";
import {DataTablesModule} from "angular-datatables";
import {ProductService} from "../../services/product.service";
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ModalDialogModule} from 'ngx-modal-dialog';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxBarcodeModule} from 'ngx-barcode';


// Components Routing


@NgModule({
  imports: [
    CommonModule,
    CustomMatrialModule,
    InventoryRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
    NgxBarcodeModule
  ],
  declarations: [
    InventoryComponent,
  ],
  providers:[
    ProductService
  ]
})
export class InventoryModule { }
