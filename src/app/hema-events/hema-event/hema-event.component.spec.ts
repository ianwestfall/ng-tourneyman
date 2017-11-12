import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HemaEventDataService } from '../hema-event-data.service'
import { AuthHttp } from 'angular2-jwt';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HemaEventComponent } from './hema-event.component';

describe('HemaEventComponent', () => {
  let component: HemaEventComponent;
  let fixture: ComponentFixture<HemaEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ HemaEventComponent ],
      providers: [
        HemaEventDataService,
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
        {provide: XHRBackend, useClass: MockBackend},
        {provide: AuthHttp, useExisting: Http},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemaEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
