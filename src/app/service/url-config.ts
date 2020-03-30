import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.111:9090/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
             userLogin: this.apiMock + 'users/login',
             userRegister: this.apiMock + 'users',
             checkEmi : this.apiMock + 'users/emi'
        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users/login',
            userRegister: this.apiHost + 'users',
            checkEmi : this.apiHost + 'users/emi'
        };
    }

     /* return url */
    urlConfig() {
        return  this.serverConfig ? this.urlApi() : this.urlMock() ;
    }
}
