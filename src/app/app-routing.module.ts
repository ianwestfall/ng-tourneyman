import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HemaEventListComponent, HemaEventCreateComponent, HemaEventComponent } from './hema-events';
import { LoginComponent, LogoutComponent, RegisterComponent } from './user';
import { AuthGuard } from './guards';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: RegisterComponent }, //TODO write a guard so authenticated users can't get to the registration page. Redirect the to the home page.
  { path: 'event-list', component: HemaEventListComponent,
    canActivate: [ AuthGuard ]},
  { path: 'create-event', component: HemaEventCreateComponent,
    canActivate: [AuthGuard] },
  { path: 'event/:id', component: HemaEventComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
