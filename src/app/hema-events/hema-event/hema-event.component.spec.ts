import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EventDateRangePipe } from '../../pipes/event-date-range.pipe';
import { EventCreatorPipe } from '../../pipes/event-creator.pipe';
import { HemaEvent } from '../hema-event';
import { Component } from '@angular/core';
import { User } from '../../common-models/user';

import { HemaEventComponent } from './hema-event.component';

describe('HemaEventComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventDateRangePipe,
        EventCreatorPipe,
        HemaEventComponent,
        TestHostComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    let testHemaEvent = new HemaEvent({
      id: 1,
      name: 'Test Event',
      description: 'Test Event Description',
      event_start_dt: new Date() ,
      event_end_dt: new Date(),
      create_dt: new Date(),
      status: 'Test Status',
      created_by: new User({
        first_name: 'Ian',
        last_name: 'West',
        email: 'ian.west@tourneyman.com',
      }),
    });
    testHostComponent.setInput(testHemaEvent); 
    testHostFixture.detectChanges();
  });

  it('should be created', () => {
    let testHemaEvent = new HemaEvent({
      id: 1,
      name: 'Test Event',
      description: 'Test Event Description',
      event_start_dt: new Date() ,
      event_end_dt: new Date(),
      create_dt: new Date(),
      status: 'Test Status',
      created_by: new User({
        first_name: 'Ian',
        last_name: 'West',
        email: 'ian.west@tourneyman.com',
      }),
    });
    testHostComponent.setInput(testHemaEvent);
    testHostFixture.detectChanges();
    expect(true).toBeTruthy();
  });
});

@Component({
  selector: 'host-component',
  template: '<hema-event [hemaEvent]="hemaEvent"></hema-event>'
})
class TestHostComponent {
  private hemaEvent: HemaEvent;
  setInput(newInput: HemaEvent){
    this.hemaEvent = newInput;
  }
}
