import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Service } from 'src/app/service/service';
import { FormBuilder } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConfig } from 'src/app/service/url-config';
import { NotificationService } from 'src/app/service/notification-service';
import { MessageService } from 'primeng/api';
import { LocationStrategy } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let api: Service;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
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
    postCall(url: string, data: any, type: string) {
      return of({
        customerName: 'tanmoy',
    emailId: 'tan123@gmail.com',
    dob: '1990-12-18',
    panNumber: 'FGTYU8956O',
    occupation: 'job',
    salary: 50000,
    employementStatus: 'salaried',
    propertyCost: 300000,
    initialDeposit: 75000,
    tenure: 18,
    rateOfInterest: 5,
    operationType: 'AUTO DEBIT',
    emiAmount: 12500
      });
    },
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [SharedModuleModule, PrimeModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute,  useValue: mockRouter},
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Service, useValue: MockUserService }, NotificationService, MessageService,
        UrlConfig]
    })
      .compileComponents();
    api = TestBed.get(Service);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
  it('accept emi first', () => {
    const emi = 12345;
    expect(component.disableFlag).toBeTruthy();
    expect(component.emi).toBe(undefined);
    component.accept();
    expect(component.disableFlag).toBeFalsy();
    expect(emi).not.toBe(undefined);
  });

  it('cancel emi first', () => {

    expect(component.disableFlag).toBeTruthy();
    expect(component.emi).toBe(undefined);
    component.cancel();
    expect(component.disableFlag).toBeTruthy();
    expect(component.emi).toBe(undefined);

  });
  it('cancel after accept', () => {
    const emi = 12345;
    component.accept();
    expect(component.disableFlag).toBeFalsy();
    expect(emi).not.toBe(undefined);
    component.cancel();
    expect(component.disableFlag).toBeTruthy();
    expect(component.emi).toBe(undefined);
  });
  // public onClickSubmit() {

  //   this.submitted = true;
  //   if (this.registerForm.valid && this.emi !== undefined) {
  it('onClickSubmit true condition', () => {
    const emi = 12456;
    component.registerForm.controls.customerName.setValue('tanmoy');
    component.registerForm.controls.emailId.setValue('tan123@gmail.com');
    component.registerForm.controls.dob.setValue('1990-12-18');
    component.registerForm.controls.panNum.setValue('FGTYUU89560');
    component.registerForm.controls.occupation.setValue('job');
    component.registerForm.controls.salary.setValue(50000);
    component.registerForm.controls.employementStatus.setValue('salaried');
    component.registerForm.controls.propertyCost.setValue(300000);
    component.registerForm.controls.initialDeposit.setValue(75000);
    component.registerForm.controls.tenure.setValue(18);
    component.registerForm.controls.rateOfInterest.setValue(5);
    component.registerForm.controls.operationType.setValue('AUTO DEBIT');
    component.onClickSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.registerForm.valid).toBeTruthy();
    expect(emi).toBeDefined();
    });
  it('onClickSubmit false condition', () => {
    const emi = undefined;
    expect(component.submitted).toBeFalsy();
    component.onClickSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.emi).toBeUndefined();
      });
});
