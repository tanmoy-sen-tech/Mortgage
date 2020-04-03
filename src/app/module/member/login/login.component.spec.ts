import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Service } from 'src/app/service/service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/service/notification-service';
import { url } from 'inspector';

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let api: Service;
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    let urls: UrlConfig;
    /* create mock data for testing */
    const MockUserService = {
      modalConfig: () => ({
        header: '',
        message: '',
        modalShow: '',
        button: []
      }),
      alertConfigDefaultValue: () => ({
        header: '',
        message: '',
        modalShow: '',
        button: []
      }),
      userDetails : {
      userId: 123,
      userName: 'tanmoy'
    },
      postCall(url: string, data: any, type: string) {
        return of({
          customerName: 'Tanmoy',
          customerId: 369,
          statusCode: 607,
        message: 'SUCCESS',
        account: [{ accountType: 'MORTGAGE ACCOUNT',
          accountNum: 145413138,
          balence: -1500.89
        }]
        });
      },
    };
    // create new instance of FormBuilder
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [SharedModuleModule, PrimeModule, HttpClientTestingModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: FormBuilder, useValue: formBuilder },
          { provide: Service, useValue: MockUserService }, NotificationService,
          UrlConfig]
      })
        .compileComponents();
      mockRouter = TestBed.get(Router);
      api = TestBed.get(Service);
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should check modalAction', () => {
              const action =  'Ok';
              const action1 = 'cancel';
              component.modalAction(action);
              expect(action).toEqual('Ok');
              expect(component.spinner).toBe(false);
              component.modalAction(action1);
              expect(action1).not.toEqual('Ok');
              expect(component.spinner).toBe(false);
            });
    it('should check ngOnInit  form creation', () => {
      component.ngOnInit();
      component.loginForm = formBuilder.group({
        loginId: ['', Validators.required],
        password: ['', Validators.required]
      });
      expect(component.loginForm.valid).toBeFalsy();
    });
      /* Login while clicking the sign in button */
    it('Should check valid form onClickSubmit', () => {
    component.loginForm.controls.loginId.setValue('Tan123');
    component.loginForm.controls.password.setValue('123345678');
    component.onClickSubmit();
    component.submitted = true;
    expect(component.loginForm.valid).toBeTruthy();
    component.loginForm.controls.loginId.setValue('');
    component.loginForm.controls.password.setValue('');
    component.onClickSubmit();
    component.submitted = true;
    expect(component.loginForm.valid).toBeFalsy();
  });
});
