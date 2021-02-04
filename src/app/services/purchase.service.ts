
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {CartService} from "./cart.service";
import {PurchaseCartService} from "./purchase.cart.service";
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';

@Injectable()
export class PurchaseService{

  constructor(private http: HttpClientService, private cartService: PurchaseCartService) { }


  newPurchase(){
    return this.http.post(environment.api.Backend.domain + '/api/purchase/save', this.cartService);
  }

  getPurchase(data){
    return this.http.post(environment.api.Backend.domain + '/api/purchase/get', data);
  }

  returnPurchase(invoiceNo){
    return this.http.delete(environment.api.Backend.domain + '/api/purhcase/movetrash?id=' + invoiceNo);

  }

}
