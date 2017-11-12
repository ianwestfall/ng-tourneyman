import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HemaEventDataService } from '../hema-event-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hema-event-create',
  templateUrl: './hema-event-create.component.html',
  styleUrls: ['./hema-event-create.component.css']
})
export class HemaEventCreateComponent implements OnInit {
  eventName: string;
  eventDescription: string;
  eventStartDate: Date;
  eventEndDate: Date;

  constructor(
    private hemaEventDataService: HemaEventDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.hemaEventDataService.createEvent(
      this.eventName,
      this.eventDescription,
      this.eventStartDate,
      this.eventEndDate
    ).subscribe(
      res => this.router.navigateByUrl('/event-list'),
      err => {
        console.error(err);
        throw err;
      }
    );
  }
}
