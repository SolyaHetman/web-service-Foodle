import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuardService {

  private loggenIn = new BehaviorSubject < boolean >(this.Token.loggedIn())
  authStatus = this.loggenIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggenIn.next(value) 
  }
  
  constructor(
    private Token: TokenService
  ) { }

}
