import { Inject, Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

import { HemaEvent } from './hema-event';

@Injectable()
export class HemaEventDataService {
  private urls = {
    'events': '/runner/events/',
  };

  constructor(
    @Inject('SETTINGS') private settings: any,
    private http: AuthHttp
  ) { }

  getAllHemaEvents(): Promise<HemaEvent[]>{
    return this.http.get(this.settings.apiUrl + this.urls['events'])
      .toPromise()
      .then(response => {
        let events = new Array<HemaEvent>();
        for(var result of response.json()){
          events.push(new HemaEvent(result));
        }
        return events;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  createEvent(eventName: string, eventDescription: string, eventStartDate: Date,
    eventEndDate: Date){
    let url = this.settings.apiUrl + this.urls['events'];
    return this.http.post(url, {
      name: eventName,
      description: eventDescription,
      start_dt: eventStartDate,
      end_dt: eventEndDate,
    })
    .map(res => res.json())
    .catch(error => Observable.throw(error.json().error || 'Server error'));

  }
}
