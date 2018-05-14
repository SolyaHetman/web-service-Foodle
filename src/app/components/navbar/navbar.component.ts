import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthGuardService } from '../../services/auth-guard.service';

import { User } from './../../models/user'


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [TokenService, AuthGuardService]
})

export class NavbarComponent implements OnInit {

  public currentUser: User;

  constructor( private authGuard: AuthGuardService) {
    this.authGuard.getUser();
    this.authGuard.CurrentUserChange.subscribe(user => {
      this.currentUser = user
    })
  }

  ngOnInit(){
  }

}
