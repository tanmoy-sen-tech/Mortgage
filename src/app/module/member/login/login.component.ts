import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { ConstantService } from 'src/app/service/constant';
import { CommonService } from 'src/app/service/common-service';
import { NotificationService } from 'src/app/service/notification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  routerPath: string;
  account: any;
  userName: string;
  userId: number;
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.routerPath = router.url;
  }
    /* Modal Action
  @param Ok modal has been closed
 */
public modalAction(action: string): void {
  if (action === 'Ok') {
    this.spinner = false;
    this.api.alertConfigDefaultValue();
  } else {
    this.spinner = false;
    this.api.alertConfigDefaultValue();
    this.router.navigate(['/member/login']);

  }
}
/*  Login form controls creation */
private createForm() {
  this.loginForm = this.fb.group({
    loginId: ['', Validators.required],
    password: ['', Validators.required]
  });
}

/*  Access to login form fields */
get login() { return this.loginForm.controls; }


 /* Login form submit action */

public onClickSubmit() {
  this.submitted = true;
  if (this.loginForm.valid) {
    const postObject = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password
    };
    this.spinner = true;

    /* Api call*/

    this.api.postCall(this.url.urlConfig().userLogin, postObject, 'post').subscribe(data => {
      if (data.statusCode === 607 ) {
        this.spinner = false;
        if (data.accountDto) {
          this.account = data.accountDto;
          this.userId = data.customerId;
          this.userName = data.customerName;
          const userDetails = {
      userId: this.userId,
      userName: this.userName
    };
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.router.navigate(['/dashboard/summary'], { state: { data: this.account
      }});
     }
        } else {
          this.spinner = false;
          this.api.alertConfig = this.api.modalConfig('Error', `${data.message}`, true, [{ name: 'Ok' }]);
     }
        },
        (error) => {
          this.spinner = false;
        });
   }
}

/* Oninit call */
      ngOnInit() {
  this.createForm();
  this.notificationService.sendRoute(this.routerPath);
}

}


