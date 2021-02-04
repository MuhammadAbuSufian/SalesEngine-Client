

import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs/Observable';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';


@Injectable()
export class HttpClientService {

  private headers = new Headers();
  private busy = 0;

  constructor(
    private http: Http,
    private spinner: Ng4LoadingSpinnerService,
    private toastr: NotificationsService,
    private storageService: StorageService
  ) {

    this.headers.set('Device-Client-Id', 'mydevice1');
    this.headers.set('Access-Control-Allow-Origin', '*');

  }


  createAuthorizationHeader() {
    console.log(this.storageService)
    if  (this.storageService.userSession != null) {
      this.headers.set('Authorization', 'Basic ' + this.storageService.userSession.Token);
    }
  }

  get(url): Observable<any> {

    this.createAuthorizationHeader();
    this.checkToBusyShow();
    this.busy++;

    return this.http.get(url, {
      headers: this.headers
    }).pipe(
      map((data: any) => {
        this.busy--;
        this.checkToBusyHide();
        return JSON.parse(data._body);
      }),
      catchError((err) => {
        this.busy--;
        this.checkToBusyHide();
        this.toastr.alert('Faild' , 'Please Try Again' );
        return err;
      })
    );
  }

  getAvoidSpinner(url): Observable<any> {

    this.createAuthorizationHeader();

    return this.http.get(url, {
      headers: this.headers
    }).pipe(
      map((data: any) => {
        return JSON.parse(data._body);
      }),
      catchError((err) => {
        this.toastr.alert('Faild' , 'Please Try Again' );
        return err;
      })
    );
  }

  post(url, data): Observable<any> {

    this.headers.set('Content-Type', 'application/json');
    this.createAuthorizationHeader();
    this.checkToBusyShow();
    this.busy++;

    return this.http.post(url, data, {
      headers: this.headers
    }).pipe(map((responseData: any) => {
        this.busy--;
        this.checkToBusyHide();
        return JSON.parse(responseData._body);
      }),
      catchError((err) => {
        this.busy--;
        this.checkToBusyHide();
        this.toastr.alert('Faild', 'Please Try Again' );
        return err;
      })
    );
  }

  delete(url): Observable<any> {

    this.headers.set('Content-Type', 'application/json');
    this.createAuthorizationHeader();
    this.checkToBusyShow();
    this.busy++;

    return this.http.delete(url,{
      headers: this.headers
    }).pipe(map((responseData: any) => {
        this.busy--;
        this.checkToBusyHide();
        this.toastr.success('Success', 'The Record Successfully Deleted');
        return;
      }),
      catchError((err) => {
        this.busy--;
        this.checkToBusyHide();
        this.toastr.alert('alert', 'Please Try Again');
        return err;
      })
    );
  }

  checkToBusyHide() {
    if (this.busy <= 0) {
      setTimeout(() => {
        this.spinner.hide();
      }, 300);
    }
  }

  checkToBusyShow() {
    if (this.busy <= 0) {
      this.spinner.show();
    }
  }

  // requestSend(){
  //   this.busy = this.busy + 1;
  // }
  // responseReceived(){
  //   this.busy = this.busy - 1;
  // }


}
