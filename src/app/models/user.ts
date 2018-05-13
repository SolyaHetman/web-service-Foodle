import { TokenService } from './../services/token.service';

export class User {
    constructor (private token: TokenService) {}
    email: 'string';
    password: 'string';
    first_name: 'string';
    diseases: any[];
    allergies: any[];
    cuisines: any[];
    is_authenticated =  this.token.isTokenExpired();
    tokenService: TokenService;
}
