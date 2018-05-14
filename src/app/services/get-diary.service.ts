import { Diary } from './../models/diary';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetDiaryService {
  private _url: string = 'http://188.166.100.169:8080/api/v1/diaries/';

  constructor(
    private http: HttpClient
  ) { }

  // Get diary
  getDiarys(): Observable<Diary[]> {
    return this.http.get<[Diary]>(this._url)

}

}
