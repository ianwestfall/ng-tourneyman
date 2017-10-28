import { TestBed, inject } from '@angular/core/testing';
import { AuthHttp } from 'angular2-jwt';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HemaEventDataService } from './hema-event-data.service';

describe('HemaEventDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HemaEventDataService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend},
        {provide: AuthHttp, useExisting: Http},
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
      ]
    });
  });

  it('should be created', inject([HemaEventDataService], (service: HemaEventDataService) => {
    expect(service).toBeTruthy();
  }));
});
