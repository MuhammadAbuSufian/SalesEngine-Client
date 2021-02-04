import { Injectable } from '@angular/core';
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';


@Injectable()
export class DashboardService {

  constructor(private http: HttpClientService) { }


  chartData(dates){
    console.log(dates)
    return this.http.post(environment.api.Backend.domain + '/api/sale/area-chart-data', dates);
  }

  getStatToday(){
    return this.http.get( environment.api.Backend.domain + '/api/sales/stat');
  }

}
