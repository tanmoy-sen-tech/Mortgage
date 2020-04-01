import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from 'src/app/service/notification-service';
import { UrlConfig } from 'src/app/service/url-config';
import { Service } from 'src/app/service/service';
import { of } from 'rxjs/internal/observable/of';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let notification: NotificationService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const MockUserService = {

    getMessage: () => {
      return of([{
        id: 1,
        imageurl: '../assets/mo1.jpg',
        categoryName: 'menoutwear',
        itemname: 'Mens Tech Shell Full',
        price: 1200,
        size: 's',
        quantity: 4
      }]);
    },
    getRoute: () => {
      return of(
       '/order/cart'
      );
    },
    clearMessages: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: NotificationService, useValue: MockUserService },
        { provide: ActivatedRoute, useValue: mockRouter }]
    })
    .compileComponents();
    notification = TestBed.get(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate toggle ', () => {
    component.toggleFlag = true;
    component.toggle();
    expect(component.toggleFlag).toBe(false);
  });
});
