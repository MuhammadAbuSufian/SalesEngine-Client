import { Injectable } from '@angular/core';
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';




@Injectable()
export class MedicineGroupService {


  constructor(private http: HttpClientService) { }


  saveMedicineGroup(medicineGroup){
    return this.http.post(environment.api.Backend.domain + '/api/group/save', medicineGroup)
  }

  viewMedicineGroup(data){
    return this.http.post(environment.api.Backend.domain + '/api/group/get', data);
  }

  viewMedicineGroupTypeAhead(data){
    return this.http.get(environment.api.Backend.domain + '/api/group/typeahead?key='+ data);
  }

}
