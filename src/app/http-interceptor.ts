import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { TokenService } from './services/token.service';
import { AppRoutingModule } from './app-routing.module';

import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

	constructor(
		private routing: AppRoutingModule,
		private tokenService: TokenService,
	){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (! (req.url.endsWith("/login/") || req.url.endsWith("/register/"))) {
			const Authorization = this.tokenService.get(); //read the token from storahe
			req = req.clone({ headers: req.headers.set('Authorization', "Bearer " + Authorization) });
		}
		//send the newly created request
		return next.handle(req)
			.catch((error, caught) => {
				if (error.status === 401) {
					//logout users, redirect to login page
					this.tokenService.remove();
					this.routing.signIn(); 
					return Observable.throw(error);
				} else {
					return Observable.throw(error);
				}
			})
	}
}