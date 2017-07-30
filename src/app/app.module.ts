import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { TopLevelErrorHandler } from './error_handler';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './toast_options';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthModule } from './auth.module';

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
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AuthModule, 
  ],
  providers: [
    { provide: 'SETTINGS', useValue: environment },
    { provide: ErrorHandler, useClass: TopLevelErrorHandler },
    { provide: ToastOptions, useClass: CustomOption },
    AuthGuard,
    UserDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
