import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserDataService {
  private urls = {
    'login': '/auth/login/',
    'register': '/auth/register/',
    'username_availability': '/registration_validation/',
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
    if(!!username && !!token){
      localStorage.setItem('currentUser', username);
      localStorage.setItem('token', token);
    }
  }

  clearLoggedInUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  login(username: string, password: string): Observable<any> {
    let url = this.settings.apiUrl + this.urls.login;
    return this.http.post(url, {"username": username, "password": password})
      .map(response => {
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
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  logout(): void {
    this.token = null;
    this.clearLoggedInUser();
    this.announceLogout();
  }

  register(username: string, password: string, email: string, firstName: string,
    lastName: string, association: string): Observable<any> {
    let url = this.settings.apiUrl + this.urls.register;
    return this.http.post(url, {
      "username": username,
      "password": password,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "association": association,
    })
    .map(res => res.json())
    .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  isUsernameAvailable(username: string): Observable<any> {
    if (username.length < 3){
      return Observable.of(false);
    }
    let url = this.settings.apiUrl + this.urls.username_availability + username;
    return this.http.get(url)
    .map(response => {
      return response.json().username_available;
    })
    .catch(error => Observable.throw(error.json().error || 'Server error'));
  }
}
