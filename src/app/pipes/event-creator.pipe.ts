import { Pipe, PipeTransform } from '@angular/core';
import { HemaEvent } from '../hema-events/hema-event';

@Pipe({ name: 'eventCreator' })
export class EventCreatorPipe implements PipeTransform {
  transform(hemaEvent: HemaEvent): string {
    return `${hemaEvent.created_by.first_name} ${hemaEvent.created_by.last_name}`; 
  }
}
