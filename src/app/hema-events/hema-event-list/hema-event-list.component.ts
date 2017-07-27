import { Component, OnInit } from '@angular/core';
import { HemaEvent } from '../hema-event';
import { HemaEventDataService } from '../hema-event-data.service'

@Component({
  selector: 'app-hema-event-list',
  templateUrl: './hema-event-list.component.html',
  styleUrls: ['./hema-event-list.component.css'],
  providers: [HemaEventDataService]
})
export class HemaEventListComponent implements OnInit {

  private hemaEvents : HemaEvent[];
  constructor(private hemaEventDataService: HemaEventDataService) { }

  ngOnInit(): void {
    this.getHemaEvents();
  }

  getHemaEvents(): void {
    this.hemaEventDataService.getAllHemaEvents()
      .then(hemaEvents => this.hemaEvents = hemaEvents);
  }
}
