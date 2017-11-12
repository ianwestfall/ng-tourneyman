import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TopLevelErrorHandler } from './error_handler';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './toast_options';

import { EventDateRangePipe } from './pipes/event-date-range.pipe';
import { EventCreatorPipe } from './pipes/event-creator.pipe';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent,  LogoutComponent, RegisterComponent, UserDataService,
  EqualValidatorDirective, UsernameAvailabilityDirective } from './user';
import { HemaEventComponent, HemaEventListComponent, HemaEventCreateComponent,
  HemaEventDataService } from './hema-events';
import { DateRangeValidatorDirective } from './hema-events/validators/date-range-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HemaEventListComponent,
    HemaEventComponent,
    EventDateRangePipe,
    EventCreatorPipe,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LogoutComponent,
    EqualValidatorDirective,
    UsernameAvailabilityDirective,
    HemaEventCreateComponent,
    DateRangeValidatorDirective,
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
    HemaEventDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
