import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';



@Injectable()
export class MedicineService{


  constructor(private http: HttpClientService) { }

  viewMedicines(searchKey = '', groupKey = '', companyKey = ''){
    return this.http.get( environment.api.Backend.domain + '/api/product/search?key=' +
      searchKey + '&groupId=' + groupKey + '&brandId=' + companyKey );
  }


}
