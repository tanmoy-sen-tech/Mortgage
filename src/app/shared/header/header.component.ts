import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/service/notification-service';

import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscrptionroute: Subscription;
  toggleFlag = false;
  routerpath: any;
  constructor(
    private router: Router,
    private notificationService: NotificationService) {
      this.routerpath = router.url;
    }

  /* toggle function while mobile view */
  public toggle(): void {
    this.toggleFlag = !this.toggleFlag;
  }

  /* logout */
  public logout(): void {
    sessionStorage.clear();
    this.notificationService.clearMessages();
    this.router.navigate(['/member/login']);
  }
  /* navigate to cart page */
  cartPage() {
    const finalList = JSON.parse(sessionStorage.getItem('cart'));
    if (finalList && finalList.foodList.length) {
      this.router.navigate(['/order/cart']);
    }
  }
  ngOnInit() {
    this.getRoutepath();
  }

  ngOnDestroy() {
   /* unsubscribe to ensure no memory leaks */
    this.subscription.unsubscribe();
    this.subscrptionroute.unsubscribe();
  }

  public getRoutepath() {
    this.subscrptionroute = this.notificationService.getRoute().subscribe(route => {
      if (route) {
        this.routerpath = route;
      } else {
        this.routerpath = null;
      }
      console.log(this.routerpath);
  });


}
}
