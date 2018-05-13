import { TokenService } from './../../services/token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [TokenService]
})
export class SigninComponent implements OnInit {
  public form = {
    email: '',
    password: ''
  };
  private url: string = 'http://188.166.100.169:8080/api/v1/login/';
  
  constructor(
    private http: HttpClient,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    private token: TokenService
  ) { }

  onSubmit() {
    return this.http.post(this.url, this.form).subscribe(
      data => this.handleRespone(data),
      error => console.log(error)
    );
  }

  handleRespone(data) {
    this.token.handle(data.token);
    this.router.navigate(['/dashboard']);
  }
  ngOnInit() {
  }

}
