import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser: string;

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.loggedInUser = this.userDataService.getCurrentUser();
  }
}
