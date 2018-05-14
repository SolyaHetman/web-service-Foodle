import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { TokenService } from './token.service';
import { Observable, } from 'rxjs/Observable';
import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthGuardService {

  private _url = 'http://188.166.100.169:8080/api/v1/user/'
  private hasUser = false;

  CurrentUserChange: Subject<User> = new Subject<User>();
  CurrentUser: User;

  constructor(
    private http: HttpClient
  ) {
      this.CurrentUserChange.subscribe(value => {
        this.CurrentUser = value;
      });

  }

  public getUser(): Observable<User> {
    if (!this.hasUser) {
      this.fetchUser();
    }
    return this.CurrentUserChange.asObservable();
  }

  public fetchUser(): void {
    this.http.get<User>(this._url) // <== http call to fetch userInfo
      .subscribe(user => {
        // user should contains roles has been granted
        this.hasUser = true;
        this.CurrentUserChange.next(user);
        this.CurrentUserChange.complete();
      }, (error) => {
        this.hasUser = false;
        this.CurrentUserChange.error(error);
      });
  }
}
