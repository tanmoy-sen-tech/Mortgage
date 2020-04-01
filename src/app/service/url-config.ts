import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = true;
    private apiHost = 'http://localhost:7028/mortgage/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
             userLogin: this.apiMock + 'users/login',
             userRegister: this.apiMock + 'users',
             checkEmi : this.apiMock + 'account',
             transactionDetails : this.apiMock + 'account',
             mockLogin : this.apiMock + 'mockLogin',
             mocktransaction : this.apiMock + 'mocktransaction',
        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users/login',
            userRegister: this.apiHost + 'users',
            checkEmi : this.apiHost + 'account',
            transactionDetails : this.apiHost + 'account',
            mockLogin : this.apiHost + 'mockLogin',
            mocktransaction : this.apiHost + 'mocktransaction',
        };
    }

     /* return url */
    urlConfig() {
        return  this.serverConfig ? this.urlApi() : this.urlMock() ;
    }
}
