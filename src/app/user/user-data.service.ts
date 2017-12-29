import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/bindNodeCallback';
import { Observer } from 'rxjs/Observer';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

@Injectable()
export class UserDataService {
  private urls = {
    'login': '/auth/jwt/create/',
    'register': '/auth/users/create/',
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

  private userPool;

  constructor(
    @Inject('SETTINGS') private settings: any,
    private http: Http
  ) {
    this.token = localStorage.getItem('token');
    let poolData = {
      UserPoolId: this.settings.userPoolId,
      ClientId: this.settings.userPoolClientId,
    };

    this.userPool = new CognitoUserPool(poolData);
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
    let authData = {
      Username: username,
      Password: password,
    };

    let authDetails = new AuthenticationDetails(authData);
    let userData = {
      Username: username,
      Pool: this.userPool,
    };

    let cognitoUser = new CognitoUser(userData);

    return Observable.create((observer: Observer<{ idToken: string }>) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: session => {
          let token = session.getIdToken().getJwtToken();
          if (token) {
            this.token = token;
            this.storeLoggedInUser(username, token);
            this.announceLogin(username);
          }
          observer.next({ idToken: session.getIdToken().getJwtToken() });
          observer.complete();
        },
        onFailure: error => observer.error(error),
        newPasswordRequired: () => {},  // no-op
        mfaRequired: () => {},  // no-op
        customChallenge: () => {} // no-op
      });
    });
  }

  logout(): void {
    this.token = null;
    this.clearLoggedInUser();
    this.announceLogout();
  }

  register(username: string, password: string, email: string, firstName: string,
    lastName: string, association: string): Observable<any> {
      var attributeList = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: 'given_name',
          Value: firstName,
        }),
        new CognitoUserAttribute({
          Name: 'family_name',
          Value: lastName,
        }),
        new CognitoUserAttribute({
          Name: 'custom:association',
          Value: association,
        }),
      ];

      let signUp = Observable.bindNodeCallback<string, string, any[], any[], any>(this.userPool.signUp.bind(this.userPool));
      return signUp(username, password, attributeList, null);
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
