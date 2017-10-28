import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HemaEventListComponent } from './hema-event-list.component';
import { HemaEventDataService } from '../hema-event-data.service'
import { AuthHttp } from 'angular2-jwt';

describe('HemaEventListComponent', () => {
  let component: HemaEventListComponent;
  let fixture: ComponentFixture<HemaEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,],
      declarations: [ HemaEventListComponent ],
      providers: [
        HemaEventDataService,
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
        {provide: XHRBackend, useClass: MockBackend},
        {provide: AuthHttp, useExisting: Http},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemaEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
