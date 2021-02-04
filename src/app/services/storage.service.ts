import {UserSessionModel} from '../models/userSession.model';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  public userSession: UserSessionModel;
  public balence = 0;
  public permissions = [];

  hasPermission(permissionName){
    let result = false
    this.permissions.forEach(permission => {
      if(permission.Name == permissionName) {
        result =  true;
      }
    })
    return result;
  }
}
