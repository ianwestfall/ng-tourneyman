import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HemaEventListComponent } from './hema-events/hema-event-list/hema-event-list.component';

const routes: Routes = [
  { path: 'event-list', component: HemaEventListComponent},
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
