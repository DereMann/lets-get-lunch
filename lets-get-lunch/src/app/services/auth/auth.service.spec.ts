import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NgxWebstorageModule, LocalStorageService, SessionStorageService } from 'ngx-webstorage'

import { JwtModule } from '@auth0/angular-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;
  let localStorage: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxWebstorageModule.forRoot(),
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.retrieve('Authorization');
            }
          }
        })
      ],
      providers: [AuthService]//, LocalStorageService] // don't add localStorageService for new version as provider
    });

    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
    localStorage = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a token with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$oF7YW1FyOSW3Gw7G4ThbO.ibduCgF3U0gVI/GE9fKQcGtVEBs0B.2',
        '_id': '5a550ea739fbc4ca3ee0ce58',
        'dietPreferences': []
      };
      const loginResponse = { 'token': 's3cr3tt0ken' };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });
      spyOn(authService, 'login').and.callFake(() => Observable.of(loginResponse));

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);
      expect(response).toEqual(loginResponse);
      expect(authService.login).toHaveBeenCalled();
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { username: 'myUser', password: 'pswd' };
      const signupResponse = 'Your password must be at least 5 characters long.';
      let errorResponse;
      authService.signup(user).subscribe(res => { }, err => {
        errorResponse = err;
      });
      http
        .expectOne('http://localhost:8080/api/users')
        .flush({ message: signupResponse }, { status: 400, statusText: 'Bad Request' });
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });

  describe("login", () => {
    it('should return a token with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const loginResponse = { 'token': 's3cr3tt0ken' };
      let response;

      authService.login(user).subscribe(res => {
        response = res;
      });
      spyOn(authService.loggedIn, 'emit');

      http.expectOne('http://localhost:8080/api/sessions').flush(loginResponse);
      expect(response).toEqual(loginResponse);
      expect(localStorage.retrieve('Authorization')).toEqual('s3cr3tt0ken');
      expect(authService.loggedIn.emit).toHaveBeenCalled();
      http.verify();
    });
  });

  describe('logout', () => {
    it('should clear the token from local storage', () => {
      spyOn(authService.loggedIn, 'emit');
      localStorage.store('Authorization', 's3cr3tt0ken');
      expect(localStorage.retrieve('Authorization')).toEqual('s3cr3tt0ken');
      authService.logout();
      expect(localStorage.retrieve('Authorization')).toBeFalsy();
      expect(authService.loggedIn.emit).toHaveBeenCalledWith(false);
    });
  });

  //remember to include exp field in JWT as expiry date - otherwise the token will always be expired
  describe('isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      localStorage.store('Authorization', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.' +
        'eyJuYW1laWQiOiIzIiwidW5pcXVlX25hbWUiOiJ1c2VyIiwibmJmIjoxNTM0NDk2MjA4LCJleHAiOjE2MzQ1ODI2MDksImlhdCI6MTUzNDQ5NjIwOH0.' +
        'd3MLHBqu1BTKpQK1_PRef3jfedUxEkZUEJPxIxjOmuRwy9rrwGG5ZhHETey7cLYr4I1-mGFtqVpLqFCupHgxTQ');
      expect(authService.isLoggedIn()).toEqual(true);
    });

    it('should return false if the user is not logged in', () => {
      localStorage.clear('Authorization');
      expect(authService.isLoggedIn()).toEqual(false);
    });
  });
});
