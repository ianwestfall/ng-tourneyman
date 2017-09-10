import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginFailed: boolean = false;
  returnUrl: string;

  constructor (
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit() {
    this.userDataService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(form: NgForm) {
      let success = this.userDataService.login(this.username, this.password);
      success.then(logged_in => {
        this.router.navigateByUrl(this.returnUrl);
      }, error => {
        this.username = null;
        this.password = null;
        form.reset();
        this.loginFailed = true;
      });
  }
}
