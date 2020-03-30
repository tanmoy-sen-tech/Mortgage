import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class NotificationService {
    private subject = new Subject<any>();
    private rotersubject = new Subject<any>();
    private cartvalueSubject = new Subject<any>();
    /* Set the message in subject variable */
    sendMessage(message: any) {
        this.subject.next(message);
    }
    sendRoute(messager: any) {

      this.rotersubject.next(messager);
  }
    sendTotal(cartmessage: any) {
      this.cartvalueSubject.next(cartmessage);
    }
    /* Clear the message from subject*/
    clearMessages() {
        this.subject.next();
        this.rotersubject.next();
        this.cartvalueSubject.next();
    }

    /* Get the message from subject*/
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    getRoute(): Observable<any> {
      return this.rotersubject.asObservable();
    }
    getTotal(): Observable<any> {
      return this.cartvalueSubject.asObservable();
    }
}
