import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';
import {HttpClientService} from './httpClient';

@Injectable()
export class AuthService {
  constructor(private  httpClient: HttpClientService, private storageService: StorageService) { }

  postLogin(data) {
    return this.httpClient.post(environment.api.Backend.domain + '/api/User/Login', data);
  }

  storeUserData(userSession) {
    localStorage.setItem('userSession', JSON.stringify(userSession));
    this.storageService.userSession = userSession;
    // this.storageService.userSession.Token = '';
    console.log(this.storageService.userSession);
  }

  loggedIn() {
    if( this.storageService.userSession != null ) {
      return true;
    } else {
      try {
        const  userSessionString = localStorage.getItem( 'userSession' );
        const userSessionParsed = JSON.parse(userSessionString);
        if(userSessionParsed != null) {
          this.storageService.userSession = userSessionParsed;
          return true;
        } else {
          return false;
        }
      } catch ( e ) {
        return false;
      }
    }
  }

  logout() {
    localStorage.removeItem('userSession');
    this.storageService.userSession = null;
  }

  postLogout(data) {
    return this.httpClient.post(environment.api.Backend.domain + '/api/User/Logout', data);
  }

  getPermission(){
    return this.httpClient.get(environment.api.Backend.domain + '/api/User/permissions');
  }
}
