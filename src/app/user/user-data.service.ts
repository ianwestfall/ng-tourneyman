import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserDataService {
  private urls = {
    'login': '/auth/login/',
    'register': '/auth/register/',
  };
  private loginAnnouncedSource = new Subject<string>();
  private logoutAnnouncedSource = new Subject<string>();

  loginAnnouncedSource$ = this.loginAnnouncedSource.asObservable();
  logoutAnnouncedSource$ = this.logoutAnnouncedSource.asObservable();

  announceLogin(login: string) {
    this.loginAnnouncedSource.next(login);
  }

  announceLogout() {
    this.logoutAnnouncedSource.next(null);
  }

  public token: string;

  constructor(
    @Inject('SETTINGS') private settings: any,
    private http: Http
  ) {
    this.token = localStorage.getItem('token');
  }

  loggedIn(): boolean {
    return tokenNotExpired();
  }

  getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }

  storeLoggedInUser(username: string, token: string): void {
    localStorage.setItem('currentUser', username);
    localStorage.setItem('token', token);
  }

  clearLoggedInUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  login(username: string, password: string): Promise<boolean> {
    let url = this.settings.apiUrl + this.urls.login;
    return this.http.post(url, {"username": username, "password": password})
      .toPromise()
      .then(response => {
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          this.storeLoggedInUser(username, token);
          this.announceLogin(username);
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
    this.clearLoggedInUser();
    this.announceLogout();
  }

  register(username: string, password: string, email: string, firstName: string,
    lastName: string, association: string): Promise<boolean> {
    let url = this.settings.apiUrl + this.urls.register;
    return this.http.post(url, {
      "username": username,
      "password": password,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "association": association, 
    })
    .toPromise()
    .then(response => {
      return true;
    })
    .catch(error => {
      return Promise.reject(error.message || error);
    });
  }
}
