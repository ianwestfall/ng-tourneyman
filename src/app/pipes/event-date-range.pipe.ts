import { Pipe, PipeTransform } from '@angular/core';
import { HemaEvent } from '../hema-events/hema-event';

@Pipe({ name: 'eventDateRange' })
export class EventDateRangePipe implements PipeTransform {
  private formatDate(date: Date): string {
    return `${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}`;
  }

  transform(hemaEvent: HemaEvent): string {
    if(hemaEvent.event_start_dt.getTime() === hemaEvent.event_end_dt.getTime()){
      return this.formatDate(hemaEvent.event_start_dt);
    }
    else return `${this.formatDate(hemaEvent.event_start_dt)} - ${this.formatDate(hemaEvent.event_end_dt)}`;
  }
}
