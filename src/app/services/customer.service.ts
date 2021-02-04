import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClientService} from './httpClient';

@Injectable()
export  class CustomerService {

  constructor(private http: HttpClientService) { }

  saveCustomer(customer){
    return this.http.post(environment.api.Backend.domain + '/api/customer/add', customer);
  }

  getCustomer(data){
    return this.http.post(environment.api.Backend.domain + '/api/customer/get', data);
  }

  getCustomerTypeAhead(key){
    return this.http.get(environment.api.Backend.domain + '/api/customer/typeahead?key=' + key);
  }

}
