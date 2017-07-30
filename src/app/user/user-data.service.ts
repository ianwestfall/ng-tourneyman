import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserDataService {
  private urls = {
    'login': '/auth/login/',
  };

  public token: string;

  constructor(
    @Inject('SETTINGS') private settings: any,
    private http: Http
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  loggedIn(): boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return !!currentUser;
  }

  getCurrentUser(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.username;
  }

  login(username: string, password: string): Promise<boolean> {
    let url = this.settings.apiUrl + this.urls.login;
    return this.http.post(url, {"username": username, "password": password})
      .toPromise()
      .then(response => {
        let token = response.json() && response.json().auth_token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({'username': username, 'token': token}));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        return Promise.reject(error.message || error);
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
