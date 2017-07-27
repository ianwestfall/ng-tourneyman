import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemaEventComponent } from './hema-event.component';

describe('HemaEventComponent', () => {
  let component: HemaEventComponent;
  let fixture: ComponentFixture<HemaEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemaEventComponent ]
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
