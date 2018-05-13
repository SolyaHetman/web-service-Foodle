import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SaveDiaryService {

  constructor(
    private http: HttpClient
  ) { }

  saveNewDiary(diaryList): Observable<any> {
    return this.http.post('http://188.166.100.169:8080/api/v1/diaries/create/', diaryList);
  }
}
