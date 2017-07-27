import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HemaEvent } from './hema-event';

@Injectable()
export class HemaEventDataService {
  private eventsUrl = this.settings.apiUrl + '/runner/events/';

  constructor(@Inject('SETTINGS') private settings: any, private http: Http) { }

  private getAuthHeaderValue(): string {
    return 'Basic ' + btoa(this.settings.apiUser + ':' + this.settings.apiPassword);
  }

  getAllHemaEvents(): Promise<HemaEvent[]>{
    let headers = new Headers();
    headers.append('Authorization', this.getAuthHeaderValue());

    return this.http.get(this.eventsUrl, {headers: headers})
      .toPromise()
      .then(response => {
        let events = new Array<HemaEvent>();
        for(var result of response.json().results){
          events.push(new HemaEvent(result));
        }
        return events;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
