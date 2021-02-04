import {Component, Input, OnInit} from '@angular/core';
import { navItems } from './../../_nav';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from '../../services/storage.service';
import {environment} from '../../../environments/environment';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public navItemsAll = navItems;
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public loading = true;
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: false,
    clickIconToClose: true
  }
  version = environment.version;
  showBalence = false;
  companyBalence = 0;
  constructor(
              private authService: AuthService,
              private router: Router,
              public storageService: StorageService,
              public accountService: AccountService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.getPermission();
  }



  ngOnInit(): void {
    this.accountService.getBalence().subscribe((res)=>{
      this.storageService.balence = res;
    })
  }

  viewBalence(){
    this.accountService.getBalence().subscribe((res)=>{
      this.storageService.balence = res;
      this.showBalence = true;
      setTimeout(()=>{
        this.showBalence = false;
      },1000)
    })

  }

  getPermission(){
    this.authService.getPermission().subscribe((res)=>{
      console.log(res)
      this.storageService.permissions = res;
      this.navItemsAll.forEach((navItem)=>{
        res.forEach((permissionItem)=>{
          if(permissionItem.Name == navItem.permissionName){
            if(navItem.children != undefined){
              let childs = [];
              navItem.children.forEach((child)=>{
                let insertable = true;
                res.forEach((childPermissionItem)=>{
                  if(childPermissionItem.Name == child.permissionName){
                    if(insertable == true){
                      childs.push(child);
                    }
                  }
                })
              })
              navItem.children = childs
            }
            this.navItems.push(navItem)
          }
        });
      })
    })
    console.log('displaying')
    console.log(this.navItems)
    console.log('displaying')

  }

  logout(){
    this.authService.logout();
    // this.flashMessage.show('successfully loged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  }

}
