import { Allergie } from './../models/allergie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetAllergiesService {
  
  private _url: string = 'http://188.166.100.169:8080/api/v1/allergies/';
  constructor(
    private http: HttpClient
  ) { }

  // Get data
  getAllergies(): Observable<Allergie[]> {
    return this.http.get<Allergie[]>(this._url);
  }
}
