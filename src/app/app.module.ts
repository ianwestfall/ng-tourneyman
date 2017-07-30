import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HemaEventComponent } from './hema-events/hema-event/hema-event.component';
import { HemaEventListComponent } from './hema-events/hema-event-list/hema-event-list.component';

import { EventDateRangePipe } from './pipes/event-date-range.pipe';
import { EventCreatorPipe } from './pipes/event-creator.pipe';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { LoginComponent } from './user/login/login.component';

import { AuthGuard } from './guards/auth.guard';

import { UserDataService } from './user/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HemaEventListComponent,
    HemaEventComponent,
    EventDateRangePipe,
    EventCreatorPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'SETTINGS', useValue: environment },
    AuthGuard,
    UserDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
