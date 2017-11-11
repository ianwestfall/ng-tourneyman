import { TestBed, inject } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { HttpModule, Http, Response, ResponseOptions, ResponseType, XHRBackend, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserDataService,
        {provide: 'SETTINGS', useValue: { apiUrl: 'http://www.example.com/'}},
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCurrentUser()', () => {
    it('should return current user when there is one', inject([UserDataService], (service: UserDataService) => {
      const testUsername = 'ian';
      localStorage.setItem('currentUser', testUsername);
      expect(service.getCurrentUser()).toBe(testUsername);
    }));

    it('should return null when there is no current user', inject([UserDataService], (service: UserDataService) => {
      expect(service.getCurrentUser()).toBeNull();
    }));
  });

  describe('storeLoggedInUser()', () => {
    it('should store given user and token', inject([UserDataService], (service: UserDataService) => {
      const testUsername = 'ian';
      const testToken = 'test_token';
      service.storeLoggedInUser(testUsername, testToken);
      expect(localStorage.getItem('currentUser')).toBe(testUsername);
      expect(localStorage.getItem('token')).toBe(testToken);
    }));

    it('should store given user and token, even when null', inject([UserDataService], (service: UserDataService) => {
      service.storeLoggedInUser(null, null);
      expect(localStorage.getItem('currentUser')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    }));
  });

  describe('clearLoggedInUser()', () => {
    it('should clear current user and token from local storage', inject([UserDataService], (service: UserDataService) => {
      localStorage.setItem('currentUser', 'ian');
      localStorage.setItem('token', 'test_token');
      service.clearLoggedInUser();
      expect(localStorage.getItem('currentUser')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    }));

    it('should do nothing if current user and token do not exist in local storage', inject([UserDataService], (service: UserDataService) => {
      service.clearLoggedInUser();
      expect(localStorage.getItem('currentUser')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    }));
  });

  describe('login()', () => {
    it('should post and return true if the server accepts the login', inject([UserDataService, XHRBackend], (service: UserDataService, mockBackend: MockBackend) => {
      const testUsername = 'username';
      const testPassword = 'password';
      const testToken = 'test_token';
      const mockResponse = {
        token: testToken,
      };

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain('/auth/jwt/create/');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request._body.username).toBe(testUsername);
        expect(connection.request._body.password).toBe(testPassword);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      spyOn(service, 'announceLogin');

      service.login(testUsername, testPassword).subscribe(logged_in => {
        expect(logged_in).toBeTruthy();
        expect(localStorage.getItem('currentUser')).toBe(testUsername);
        expect(localStorage.getItem('token')).toBe(testToken);
        expect(service.announceLogin).toHaveBeenCalledTimes(1);
      });
    }));

    it('should post and return false if the server rejects the login', inject([UserDataService, XHRBackend], (service: UserDataService, mockBackend: MockBackend) => {
      const testUsername = 'username';
      const testPassword = 'password';
      const mockResponse = {};

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain('/auth/jwt/create/');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request._body.username).toBe(testUsername);
        expect(connection.request._body.password).toBe(testPassword);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      spyOn(service, 'announceLogin');

      service.login(testUsername, testPassword).subscribe(logged_in => {
        expect(logged_in).toBeFalsy();
        expect(localStorage.getItem('currentUser')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(service.announceLogin).toHaveBeenCalledTimes(0);
      });
    }));

    it('should post and return an error if the post errors out', inject([UserDataService, XHRBackend], (service: UserDataService, mockBackend: MockBackend) => {
      const testUsername = 'username';
      const testPassword = 'password';
      const mockResponse = {
        error: 'Something bad happened',
      };

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain('/auth/jwt/create/');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request._body.username).toBe(testUsername);
        expect(connection.request._body.password).toBe(testPassword);
        connection.mockError(new Response(new ResponseOptions({
          type: ResponseType.Error,
          status: 500,
          body: JSON.stringify(mockResponse),
        })));
      });

      spyOn(service, 'announceLogin');

      service.login(testUsername, testPassword).subscribe(
        logged_in => {
          fail('An error should have been raised');
        },
        err => {
          expect(err).toBe(mockResponse.error);
          expect(localStorage.getItem('currentUser')).toBeNull();
          expect(localStorage.getItem('token')).toBeNull();
          expect(service.announceLogin).toHaveBeenCalledTimes(0);
        }
      );
    }));
  });

  describe('logout()', () => {
    it('should clear the logged in user and anounce the logout', inject([UserDataService], (service: UserDataService) => {
      service.token = 'test_token';
      spyOn(service, 'clearLoggedInUser');
      spyOn(service, 'announceLogout');
      service.logout();
      expect(service.token).toBeNull();
      expect(service.clearLoggedInUser).toHaveBeenCalledTimes(1);
      expect(service.announceLogout).toHaveBeenCalledTimes(1);
    }));
  });

  describe('register()', () => {
    it('should register the given user', inject([UserDataService, XHRBackend], (service: UserDataService, mockBackend: MockBackend) => {
      const testUserInfo = {
        username: 'username',
        password: 'password',
        email: 'email',
        first_name: 'firstName',
        last_name: 'lastName',
        association: 'association',
      };

      const mockResponse = {};

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain('/auth/users/create/');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request._body.username).toBe(testUserInfo.username);
        expect(connection.request._body.password).toBe(testUserInfo.password);
        expect(connection.request._body.email).toBe(testUserInfo.email);
        expect(connection.request._body.first_name).toBe(testUserInfo.first_name);
        expect(connection.request._body.last_name).toBe(testUserInfo.last_name);
        expect(connection.request._body.association).toBe(testUserInfo.association);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse),
        })));
      });

      service.register(
        testUserInfo.username,
        testUserInfo.password,
        testUserInfo.email,
        testUserInfo.first_name,
        testUserInfo.last_name,
        testUserInfo.association,
      )
      .subscribe(res => {
        expect(res).toBeTruthy();
      });

    }));

    it('should post and return an error if the post errors out', inject([UserDataService, XHRBackend], (service: UserDataService, mockBackend: MockBackend) => {
      const testUserInfo = {
        username: 'username',
        password: 'password',
        email: 'email',
        first_name: 'firstName',
        last_name: 'lastName',
        association: 'association',
      };

      const mockResponse = {
        error: 'Something bad happened',
      };

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain('/auth/users/create/');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request._body.username).toBe(testUserInfo.username);
        expect(connection.request._body.password).toBe(testUserInfo.password);
        expect(connection.request._body.email).toBe(testUserInfo.email);
        expect(connection.request._body.first_name).toBe(testUserInfo.first_name);
        expect(connection.request._body.last_name).toBe(testUserInfo.last_name);
        expect(connection.request._body.association).toBe(testUserInfo.association);
        connection.mockError(new Response(new ResponseOptions({
          type: ResponseType.Error,
          status: 500,
          body: JSON.stringify(mockResponse),
        })));
      });

      service.register(
        testUserInfo.username,
        testUserInfo.password,
        testUserInfo.email,
        testUserInfo.first_name,
        testUserInfo.last_name,
        testUserInfo.association,
      )
      .subscribe(
        res => {
          fail('An error should have been raised');
        },
        err => {
          expect(err).toBe(mockResponse.error);
        },
      );
    }));
  });

  describe('isUsernameAvailable()', () => {
    it('should return false without hitting HTTP if argument is not long enough', inject([UserDataService, XHRBackend], (service, mockBackend) => {
      const mockResponse = {
        username_available: true,
      };

      mockBackend.connections.subscribe((connection) => {
        fail('No HTTP call should have been made');
      });

      service.isUsernameAvailable('12').subscribe((available) => {
        expect(available).toBeFalsy();
      });
    }));

    it('should check username availability via HTTP if argument is long enough', inject([UserDataService, XHRBackend], (service, mockBackend) => {
      const testUsername = 'ian';
      const mockResponse = {
        username_available: true,
      };

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain(service.urls.username_availability + testUsername);
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.isUsernameAvailable(testUsername).subscribe((available) => {
        expect(available).toBe(true);
      });
    }));

    it('should get and return an error if the get errors out', inject([UserDataService, XHRBackend], (service, mockBackend) => {
      const testUsername = 'username';

      const mockResponse = {
        error: 'Something bad happened',
      };

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toContain(service.urls.username_availability + testUsername);
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new Response(new ResponseOptions({
          type: ResponseType.Error,
          status: 500,
          body: JSON.stringify(mockResponse),
        })));
      });

      service.isUsernameAvailable(testUsername)
      .subscribe(
        res => {
          fail('An error should have been raised');
        },
        err => {
          expect(err).toBe(mockResponse.error);
        },
      );
    }));
  });
});
