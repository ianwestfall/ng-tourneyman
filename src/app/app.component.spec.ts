import { TestBed, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { UserDataService } from './user/user-data.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        UserDataService,
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
        {provide: XHRBackend, useClass: MockBackend},
        ToastsManager,
        ToastOptions,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TourneyMan');
  }));

  it('should render title in an a tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('TourneyMan');
  }));
});
