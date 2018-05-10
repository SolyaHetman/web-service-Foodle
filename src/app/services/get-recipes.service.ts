import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetRecipesService {
  private _url: string = 'http://188.166.100.169:8080/api/v1/diaries/recommendations/';
  constructor(
    private http: HttpClient
  ) { }

  // Get data
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this._url)
    
  }
}
