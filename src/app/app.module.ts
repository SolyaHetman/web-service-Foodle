// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule} from "@angular/http";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CustomHttpInterceptor } from './http-interceptor';
import { TokenService } from './services/token.service';
import { Title } from "@angular/platform-browser";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiaryComponent } from './components/diary/diary.component';
import { LandingComponent } from './components/landing/landing.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    DiaryComponent,
    LandingComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    TokenService,
    TruncatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
