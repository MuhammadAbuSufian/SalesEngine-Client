import { Injectable } from '@angular/core';
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';

@Injectable()

export class ProductService {

  constructor(private http: HttpClientService) { }

  saveProduct(data){
    return this.http.post(environment.api.Backend.domain + '/api/product/save', data);
  }

  updateStcok(id, addStock){
    return this.http.get(environment.api.Backend.domain + '/api/product/stockupdate?id=' + id + '&addStock=' + addStock);
  }

  viewProduct(data) {
    return this.http.post(environment.api.Backend.domain + '/api/product/get', data);
  }
}
