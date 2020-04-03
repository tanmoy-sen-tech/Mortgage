import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification-service';
import {MenuItem, MessageService} from 'primeng/api';
import { UserType, InterestValue, TenureTime, Operation } from 'src/app/model/model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  disableFlag = true;
  items: MenuItem[];
  activeIndex = 0;
  registerForm: FormGroup;
  submitted = false;
  spinner = false;
  routerPath: string;
  employment: UserType[];
  interest: InterestValue[];
  time: TenureTime[];
  payemntTime: Operation[];
  calculateEmi;
  emi: number;
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private router: Router,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {
    this.employment = [
      {name: 'Self-employed'},
      {name: 'Salaried'}
    ];
    this.interest = [
      {value: 5},
      {value: 10},
      {value: 15},
      {value: 20}
    ];
    this.time = [
      {value: 12},
      {value: 18},
      {value: 24},
      {value: 30},
    ];
    this.payemntTime = [
      {value: 'AUTO DEBIT'},
      {value: 'MANNUAL PAYMENT'}
    ];
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
  this.registerForm = this.fb.group({
    customerName: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    panNum: ['', [Validators.required]],
    occupation: ['', Validators.required],
    salary: ['', Validators.required],
    employementStatus: ['', Validators.required],
    propertyCost: ['', Validators.required],
    initialDeposit: ['', Validators.required],
    tenure: ['', Validators.required],
    rateOfInterest: ['', Validators.required],
    operationType: ['', Validators.required]
  });
}

/*  Access to login form fields */
get login() { return this.registerForm.controls; }

/* emi check */

checkEmi() {
  if (this.registerForm.value.propertyCost !== '' && this.registerForm.value.tenure !== '' && this.registerForm.value.rateOfInterest !== ''
  && this.registerForm.value.initialDeposit !== '') {
const emiObject = {
  propertyCost : Number(this.registerForm.value.propertyCost),
  tenure: Number(this.registerForm.value.tenure),
  rateOfInterest: Number(this.registerForm.value.rateOfInterest),
  initialDeposit: Number(this.registerForm.value.initialDeposit),
};
this.spinner = true;
this.api.postCall(this.url.urlConfig().checkEmi, emiObject, 'post').subscribe(data => {
  if (data.statusCode === 607) {
    this.calculateEmi = data.emiAmount;
    this.spinner = false;
  } else {
     this.api.alertConfig = this.api.modalConfig('Error', '${data.message}', true, [{ name: 'Ok' }]);
     this.spinner = false;
  }

},
  (error) => {
    this.spinner = false;
  });
  } else {
    this.messageService.add({severity: 'warn', summary: 'Please Fill Property Details'});
  }
}
/*accept emi amount */

accept() {
  this.disableFlag = false;
  this.emi = this.calculateEmi;
}
/*reject emi amount */

cancel() {
  this.disableFlag = true;
  this.emi = undefined;
  this.calculateEmi = undefined;
}
/* on click of submit button*/

public onClickSubmit() {

  this.submitted = true;
  if (this.registerForm.valid) {
    if (this.emi !== undefined) {
    const postObject = {
       customerName: this.registerForm.value.customerName,
    emailId: this.registerForm.value.emailId,
    dob: this.registerForm.value.dob,
    panNumber: this.registerForm.value.panNum,
    occupation: this.registerForm.value.occupation,
    salary: Number(this.registerForm.value.salary),
    employementStatus: this.registerForm.value.employementStatus,
    propertyCost: Number(this.registerForm.value.propertyCost),
    initialDeposit: Number(this.registerForm.value.initialDeposit),
    tenure: Number(this.registerForm.value.tenure),
    rateOfInterest: Number(this.registerForm.value.rateOfInterest),
    operationType: this.registerForm.value.operationType,
    emiAmount: Number(this.emi)
    };
        /* Api call*/
    this.spinner = true;
    this.api.postCall(this.url.urlConfig().userRegister, postObject, 'post').subscribe(data => {
          if (data.statusCode === 607) {
            this.spinner = false;
            this.api.alertConfig = this.api.modalConfig('Error', `${data.customerDto.loginId}` + ` password:${data.customerDto.password}`,
             true, [{ name: 'Ok' }]);
          } else {
            this.api.alertConfig = this.api.modalConfig('Error', `${data.message}`, true, [{ name: 'Ok' }]);
            this.spinner = false;
          }
        },
          (error) => {
            this.spinner = false;
          });
        } else {
          this.messageService.add({severity: 'warn', summary: 'Please check the EMI'});
        }
  } else {
    this.messageService.add({severity: 'warn', summary: 'Please fill  all the fields'});
  }
}

/* Oninit call */
ngOnInit() {
  this.notificationService.sendRoute( this.routerPath );
  // if (!this.common.validUser()) {
  //   this.router.navigate(['/']);
  // }
  this.spinner = true;
  /* Call the form creation while on component initiation */
  this.createForm();
  this.spinner = false;
  // steps
  this.items = [{
    label: 'Personal',
    command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({severity: 'info', summary: 'Please Fill Personal Details'});
    }
},
{
    label: 'Occupational',
    command: (event: any) => {
        this.activeIndex = 1;
        this.messageService.add({severity: 'info', summary: 'Please Fill  Occupational Details'});
    }
},
{
    label: 'Property details',
    command: (event: any) => {
        this.activeIndex = 2;
        this.messageService.add({severity: 'info', summary: 'Please Fill  Property details'});
    }
}
];
}
}

