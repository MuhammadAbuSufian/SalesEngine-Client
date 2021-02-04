import {Injectable} from '@angular/core';
import {HttpClientService} from './httpClient';
import {environment} from '../../environments/environment';


@Injectable()
export class SetupService {

  constructor(private http: HttpClientService) { }

  changePassword(oldPassword, newPassword) {
    return this.http.get( environment.api.Backend.domain + '/api/user/changePassword?oldPassword=' + oldPassword + '&newPassword=' + newPassword)
  }

}
