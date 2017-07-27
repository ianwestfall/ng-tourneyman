import { TestBed, inject } from '@angular/core/testing';

import { HemaEventDataService } from './hema-event-data.service';

describe('HemaEventDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HemaEventDataService]
    });
  });

  it('should be created', inject([HemaEventDataService], (service: HemaEventDataService) => {
    expect(service).toBeTruthy();
  }));
});
