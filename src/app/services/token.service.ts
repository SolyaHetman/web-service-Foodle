import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  handle(token) {
    this.set(token);
    console.log(this.payload(token));
  }

  // Set to LS
  set(token) {
    localStorage.setItem('token', token);
  }

  // Get token from LS
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() { //token
    const token =this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        // payload.iss
      }
    }
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
