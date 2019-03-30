import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean>;

  constructor(private http: HttpClient
    , private localStorage: LocalStorageService
    , public jwtHelper: JwtHelperService
  ) {
    this.loggedIn = new EventEmitter();
  }


  signup(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', credentials)
      .mergeMap(res => this.login(credentials));
  }

  login(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/sessions', credentials)
      .map((res: any) => {
        this.localStorage.store('Authorization', res.token);
        res.token = this.localStorage.retrieve('Authorization'); //just for testing purposes
        this.loggedIn.emit(true);
        return res;
      });
  }

  logout() {
    this.localStorage.clear('Authorization');
    this.loggedIn.emit(false);
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired(this.localStorage.retrieve('Authorization'));
  }
}
