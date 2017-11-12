import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HemaEvent } from '../hema-event';
import { HemaEventDataService } from '../hema-event-data.service'

@Component({
  selector: 'app-hema-event',
  templateUrl: './hema-event.component.html',
  styleUrls: ['./hema-event.component.css'],
  providers: [HemaEventDataService]
})
export class HemaEventComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private event: HemaEvent;

  constructor(private route: ActivatedRoute, private dataService: HemaEventDataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.dataService.getEvent(params['id']).subscribe(event => this.event = event);
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
