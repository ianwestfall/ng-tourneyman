import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MockBackend } from '@angular/http/testing';
import { FormsModule }   from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HemaEventCreateComponent } from './hema-event-create.component';
import { HemaEventDataService } from '../hema-event-data.service';

describe('HemaEventCreateComponent', () => {
  let component: HemaEventCreateComponent;
  let fixture: ComponentFixture<HemaEventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ HemaEventCreateComponent ],
      providers: [
        HemaEventDataService,
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
        {provide: XHRBackend, useClass: MockBackend},
        {provide: AuthHttp, useExisting: Http},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemaEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
