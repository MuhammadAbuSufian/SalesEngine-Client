import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {UserSessionModel} from '../../models/userSession.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent  implements OnInit {

  public loading = false;
  email: String;
  password: String;

  constructor(
                 private authService : AuthService,
                 private router: Router,
                 private notificationService: NotificationsService
  ){}
  ngOnInit() {
  }

  onLoginSubmit(){

    this.loading = true;
    const user = {
      Email : this.email,
      Password: this.password
    };
    this.authService.postLogin(user).subscribe((data) => {
      if ( data == null ) {
        this.notificationService.warn('Warning', 'You Have Enter Wrond Username And Password' );
        alert('You have entered wrong email and password');
      } else {
        const userSession: UserSessionModel = new UserSessionModel(data);
        this.authService.storeUserData(userSession);
        this.notificationService.success('Success', 'User Successfully Loged In');
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
