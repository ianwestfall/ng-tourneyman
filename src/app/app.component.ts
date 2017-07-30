import { Component } from '@angular/core';
import { UserDataService } from './user/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TourneyMan';

  constructor(private userService: UserDataService, private router: Router){}

  loggedIn(): boolean {
    return this.userService.loggedIn();
  }

  loggedInUser(): string {
    return this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
