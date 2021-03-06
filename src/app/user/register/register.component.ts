import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  firstName: string;
  lastName: string;
  association: string;
  password1: string;
  password2: string;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.userDataService.register(
      this.username,
      this.password1,
      this.email,
      this.firstName,
      this.lastName,
      this.association,
    ).subscribe(res => {
      this.router.navigateByUrl('/login');
    },
    err => {
      console.error(err);
      throw err; 
    });
  }
}
