import { Cuisine } from './../models/cuisine';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetCuisinesService {
  private _url: string = 'http://188.166.100.169:8080/api/v1/cuisines/';
  constructor(
    private http: HttpClient
  ) { }

  // Get data
  getCuisines(): Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this._url);
  }

}
