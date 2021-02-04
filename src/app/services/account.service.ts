import {Injectable} from '@angular/core';
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';
import {Headers} from '@angular/http';

@Injectable()
export class AccountService {


  constructor(private http: HttpClientService) { }


  saveJournal(journal){
    return this.http.post(environment.api.Backend.domain + '/api/journal/save', journal);
  }

  getJournal(data, journalManegment: boolean){
    if(journalManegment){
      return this.http.post(environment.api.Backend.domain + '/api/journal/get', data);
    }
    return this.http.post(environment.api.Backend.domain + '/api/journal/getCurrentUser', data);
  }
  getJournalByDate(data , start, end){
      return this.http.post(environment.api.Backend.domain + '/api/journal/getByDate?startDate='+ start+ '&endDate=' + end, data);
  }

  saveJournalType(journalType){
    return this.http.post(environment.api.Backend.domain + '/api/journaltype/save', journalType);
  }

  getJournalTypeDropdown(){
    return this.http.get(environment.api.Backend.domain + '/api/journaltype/dropdown');
  }

  getJournalType(data){
    return this.http.post(environment.api.Backend.domain + '/api/journaltype/get', data);
  }

  viewCompanyDataTable(data = '') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/brand/view?key='+data)
      .map(res=> res.json());
  }

  deleteJournal(id){
    return this.http.delete(environment.api.Backend.domain + '/api/journal/delete?id=' + id );
  }

  approveJournal(id){
    return this.http.get(environment.api.Backend.domain + '/api/journal/makeApprove?id=' + id );
  }

  paidJournal(id, amount){
    return this.http.get(environment.api.Backend.domain + '/api/journal/makePaid?id=' + id + '&amount=' + amount );
  }

  getBalence(){
    return this.http.get(environment.api.Backend.domain + '/api/company/getBalence' );
  }

}
