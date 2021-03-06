import { Diary } from './../../models/diary';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { GetDiaryService } from '../../services/get-diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  providers:[GetDiaryService],
})
export class DiaryComponent implements OnInit {
  public diaries = [];
  id: string;

  constructor(
    private http: HttpClient,
    private frmBuilder: FormBuilder, 
    private _getDiary: GetDiaryService,
    private _elRef: ElementRef,
    public elref: ElementRef,
    private _titleService: Title, 
    public renderer: Renderer
    
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Diary');
    this._getDiary.getDiarys()
      .subscribe(
        data => (this.diaries = data)
      );
  }

  getAllRecipesFromDiary(diary) {
    return [].concat(diary['morning']).concat(diary["lunch"]).concat(diary["dinner"]).concat(diary["supper"])
  }

  // Delete
  onDeleteDiary(id: string) {
    this._getDiary.deleteDiary(id).subscribe((response) =>{
  
    });
  }
}
