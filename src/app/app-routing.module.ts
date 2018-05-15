import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { DiaryComponent } from './components/diary/diary.component';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
	{ path: '', component: LandingComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'diary', component: DiaryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

	constructor (private route: ActivatedRoute, private router: Router){}

	navigate(url) {
		this.router.navigate([url]);
	}

	signIn() {
		this.router.navigate(['signin']);
	}

	dashboard() {
		this.router.navigate(['dashboard']);
	}

}

export const routingComponents = [DashboardComponent, SignupComponent, SigninComponent, LandingComponent]