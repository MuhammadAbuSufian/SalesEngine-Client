import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {NotificationsService} from 'angular2-notifications';
import {SetupService} from '../../../services/setup.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit{
  oldPassword = '';
  newPassword = '';
  constructor(
    public storageService: StorageService,
    private notificationService: NotificationsService,
    private setupService: SetupService,
    private authService: AuthService,
    private router: Router
  ){

  }
  ngOnInit(){

  }

  changePassword(){
    if(this.oldPassword.trim() != '' && this.newPassword.trim() != ''){
      this.setupService.changePassword(this.oldPassword, this.newPassword).subscribe((res)=>{
        if(res == true){
          this.notificationService.success('Success', 'New password changed successfully');
          setTimeout(()=>{
            this.authService.logout();
            // this.flashMessage.show('successfully loged out', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login']);
          },1500)
        }else{
          this.newPassword = '';
          this.oldPassword = '';
          this.notificationService.warn('Warning', 'You have entered wrong old password')
        }
      })
    }else{
      this.notificationService.warn('Warning', 'Please enter old and new password first')
    }
  }
}
