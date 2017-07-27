import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemaEventListComponent } from './hema-event-list.component';

describe('HemaEventListComponent', () => {
  let component: HemaEventListComponent;
  let fixture: ComponentFixture<HemaEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemaEventListComponent ]
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
