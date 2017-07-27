import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HemaEventComponent } from './hema-events/hema-event/hema-event.component';
import { HemaEventListComponent } from './hema-events/hema-event-list/hema-event-list.component';

import { EventDateRangePipe } from './pipes/event-date-range.pipe';
import { EventCreatorPipe } from './pipes/event-creator.pipe';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HemaEventListComponent,
    HemaEventComponent,
    EventDateRangePipe,
    EventCreatorPipe, 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'SETTINGS', useValue: environment },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
