import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HemaEventListComponent } from './hema-events/hema-event-list/hema-event-list.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'event-list', component: HemaEventListComponent,
    canActivate: [ AuthGuard ]},
  { path: 'login', component: LoginComponent},
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
