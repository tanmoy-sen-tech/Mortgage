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
  userId: number
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


/* Go to the page basedon type
 @param mobile is user input
 @param password is user input
*/
public onClickSubmit() {
  this.submitted = true;
  if (this.loginForm.valid) {
    const postObject = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password
    };
    console.log(postObject);
        /* Api call*/
    this.api.postCall(this.url.urlConfig().userLogin, postObject, 'post').subscribe(data => {
      if (data.statusCode === 607 ) {
        if (data.account) {
          this.account = data.account;
          this.userId = data.customerId;
          this.userName = data.customerName;
         }
          // sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
        // this.router.navigate(['/list/products'], { state: { data: data.user.type
        // }});
      } else {
         this.api.alertConfig = this.api.modalConfig('Error', `${data.message}`, true, [{ name: 'Ok' }]);

      }
        },
        error => {
          this.spinner = false;
        });
  /*mock*/
    // this.api.getList(this.url.urlConfig().mockLogin).subscribe(data => {
    // console.log(data);
    // if (data.statusCode === 200) {
    //   if (data.user) {
    //               const userDetails = {
    //                 userName: data.user.name,
    //               };
    //             }
    //   this.router.navigate(['/list/products'], { state: { data: data.user.typeId
    //          }});
    //         } else {
    //            console.log('failed');
    //          }
    //      });
   }
}



/* Oninit call */
ngOnInit() {
  this.createForm();
  this.notificationService.sendRoute(this.routerPath);
}

}


