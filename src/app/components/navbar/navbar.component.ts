import { AuthGuardService } from './../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [TokenService, AuthGuardService]
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean
  constructor(
   private authGuard: AuthGuardService 
  ) { }

  ngOnInit() {
    this.authGuard.authStatus.subscribe(value => this.loggedIn = value)
  }

}
