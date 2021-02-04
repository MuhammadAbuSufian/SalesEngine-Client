import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: ' <ng4-loading-spinner [threshold]="1000" [timeout]="200000"> </ng4-loading-spinner>\n' +
  '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: Ng4LoadingSpinnerService,
  ) { }
  loading: boolean= false;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinner.show()
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinner.hide()
      }
    });
  }
}
