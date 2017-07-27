import { Component, OnInit, Input } from '@angular/core';
import { HemaEvent } from '../hema-event'

@Component({
  selector: 'hema-event',
  templateUrl: './hema-event.component.html',
  styleUrls: ['./hema-event.component.css']
})
export class HemaEventComponent implements OnInit {

  @Input()
  private hemaEvent: HemaEvent;

  constructor() { }

  ngOnInit() {
  }
}
