import { Component, ViewContainerRef } from '@angular/core';
import { UserDataService } from './user/user-data.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TourneyMan';
  currentUser: string = null;
  subscriptions: Object = {};

  constructor(
    private userService: UserDataService,
    private router: Router,
    private toastr: ToastsManager,
    vRef: ViewContainerRef
  ){
    this.toastr.setRootViewContainerRef(vRef);
    this.subscriptions['login'] = userService.loginAnnouncedSource$.subscribe(
      currentUser => {
        setTimeout(_ => this.currentUser = currentUser);
      }
    );

    this.subscriptions['logout'] = userService.logoutAnnouncedSource$.subscribe(
      empty => {
        setTimeout(_ => this.currentUser = null); 
      }
    );

    this.currentUser = userService.getCurrentUser();
  }

  logout(): void {
    this.router.navigate(['/logout'], { queryParams: {returnUrl: this.router.url }});
  }
}
