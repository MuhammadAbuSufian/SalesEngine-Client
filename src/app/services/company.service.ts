import { Injectable } from '@angular/core';
import { Headers} from "@angular/http";
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';




@Injectable()
export class CompanyService {


  constructor(private http: HttpClientService) { }


  saveCompany(company){
    return this.http.post(environment.api.Backend.domain + '/api/brand/save', company);
  }

  getCompany(data){
    return this.http.post(environment.api.Backend.domain + '/api/brand/get', data);
  }

  getCompanyTypeaheadData(data = '') {
    return this.http.get( environment.api.Backend.domain + '/api/brand/typeahead?key=' + data)
  }


  viewCompanyDataTable(data = '') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/brand/view?key='+data)
      .map(res=> res.json());
  }




}
