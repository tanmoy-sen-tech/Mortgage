import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
userDetail: any;
routerPath: string;
accountDetails: any;
savingsAccount: number;
statements: [];
gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  spinner = false;
  constructor( private api: Service,
               private url: UrlConfig,
               private router: Router,
               private messageService: MessageService,
               private notificationService: NotificationService) {
      this.routerPath = router.url;
     }
  /*Grid component generation  */

     private generateGridColumn(): void {
      this.gridColumns = [
        {
          colName: 'Transaction ID',
          rowName: 'transactionId',
        }, {
          colName: 'Account Number ',
          rowName: 'accountNumber',
        }, {
          colName: 'Transaction Date',
          rowName: 'transactionDate',
        }, {
          colName: 'transaction Type',
          rowName: 'transactionType',
        },
        {
          colName: 'Amount',
          rowName: 'emiAmount',
        }
      ];
    }
    /* Alert modal action */
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
 /* OnInit */

  ngOnInit() {
    if (history.state) {
      if (history.state.data) {
        this.accountDetails = history.state.data;
        if (this.accountDetails) {
      this.accountDetails.forEach(element => {
        if (element.accountType === 'MORTGAGE ACCOUNT') {
            this.savingsAccount = element.accountNumber;
        }
      });
     }
      } else {
        this.router.navigate(['/member/login']);
      }

      }
    this.userDetail = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getHistory();
    this.notificationService.sendRoute( this.routerPath);
  }
   /* Get past Transactions */

  getHistory() {
    this.generateGridColumn();
    if (this.savingsAccount) {
      const params = `/${this.savingsAccount}`;
      this.spinner = true;
      this.api.getList(this.url.urlConfig().transactionDetails.concat(params)).subscribe(data => {
        if (data) {
          this.spinner = false;
          this.statements = data;
        }
        },
        (error) => {
          this.spinner = false;
        });
    }
    // this.api.getList(this.url.urlConfig().mocktransaction).subscribe(data => {
    //   this.statements = data;
    //   });
    }
}
