import { Diseases } from './../models/diseases';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetDiseasesService {
  private _url: string = 'http://188.166.100.169:8080/api/v1/diseases/';
  constructor(
    private http: HttpClient
  ) { }

  // Get data
  getDisases(): Observable<Diseases[]> {
    return this.http.get<Diseases[]>(this._url);
  }
}
