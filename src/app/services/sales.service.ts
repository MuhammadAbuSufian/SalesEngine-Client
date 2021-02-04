
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {CartService} from "./cart.service";
import {environment} from '../../environments/environment';
import {HttpClientService} from './httpClient';

@Injectable()
export class SalesService{

  constructor(private http: HttpClientService, private cartService: CartService) { }

  newSale(){
    if(this.cartService.customerId == ""){
      this.cartService.customerId = null;
    }
    return this.http.post(environment.api.Backend.domain + '/api/sale/save', this.cartService);
  }

  getSales(data, startDate, endDate){
    console.log(startDate)
    return this.http.post(environment.api.Backend.domain + '/api/sale/report?startDate='+ startDate + '&endDate=' + endDate, data);
  }

  returnSale(id){
    return this.http.delete(environment.api.Backend.domain +'/api/sale/return?invoiceNo=' + id);
  }

  dueUpdate(invoiceNo, due){
    return this.http.get(environment.api.Backend.domain + '/api/sale/dueUpadate?invoiceNo='+ invoiceNo + '&due=' + due);
  }

}
