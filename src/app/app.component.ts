import { Component, ViewContainerRef } from '@angular/core';
import { UserDataService } from './user/user-data.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TourneyMan';

  constructor(
    private userService: UserDataService,
    private router: Router,
    private toastr: ToastsManager,
    vRef: ViewContainerRef
  ){
    this.toastr.setRootViewContainerRef(vRef);
  }

  loggedInUser(): string {
    return this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
