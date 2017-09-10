import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private returnUrl: string;

  constructor(
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([this.returnUrl]);
  }
}
