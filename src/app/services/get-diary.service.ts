import { Diary } from './../models/diary';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetDiaryService {
  id: string;
  private _url: string = 'http://188.166.100.169:8080/api/v1/diaries/';
  private _deleteUrl: string = `http://188.166.100.169:8080/api/v1/diaries/`

  constructor(
    private http: HttpClient
  ) { }

  // Get diary
  getDiarys(): Observable<Diary[]> {
    return this.http.get<[Diary]>(this._url)
  }

  // Delete Diary
  deleteDiary(id): Observable<Diary[]> {
    return this.http.delete<[Diary]>(this._deleteUrl+this.id)
  }

}
