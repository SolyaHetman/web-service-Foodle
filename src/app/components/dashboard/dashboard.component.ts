import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';

import { Recipe } from '../../models/recipe';
import { Diary } from '../../models/diary';
import { GetRecipesService } from '../../services/get-recipes.service';
import { MorgningRecipes } from './../../models/morning-recipes';
import { SaveDiaryService } from '../../services/save-diary.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[GetRecipesService, SaveDiaryService]
})
export class DashboardComponent implements OnInit {
  public recipes = [];
  save_diary_form = {
    'name': '',
    'morning_recipes': [],
    'lunch_recipes': [],
    'dinner_recipes': [],
    'supper_recipes': [],
  }

  private url: string = 'http://188.166.100.169:8080/api/v1/diaries/create/';

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private frmBuilder: FormBuilder, 
    private _getRecipe: GetRecipesService,
    public elref: ElementRef, 
    public renderer: Renderer,
    public saveDiaryService: SaveDiaryService
  ) { }

  ngOnInit() {
    this._getRecipe.getRecipes()
      .subscribe(
        data => this.recipes = data
      );
  }
  // remove(event) {
  //   if (event.target.parentElement.classList.contains('form-group')) {
  //     console.log('Works');
  //   } else {console.log('Not work')}
  // }

  // Add to Diary Item
  onClick(event, type) {
    const form = document.getElementById('create-diary-form');
    const saveBtn = document.getElementById('save-btn');

    if (event.target.parentElement.classList.contains('sportmenu-plus')) {

      // Get Name of Recipe
      let attrName = event.target.getAttribute('data-name');
      let attrId = event.target.getAttribute('data-id');

      switch (type) {
        case "morning":
          this.save_diary_form.morning_recipes.push(attrId)
        case "lunch":
          this.save_diary_form.lunch_recipes.push(attrId)
        case "dinner":
          this.save_diary_form.dinner_recipes.push(attrId)
        case "supper":
          this.save_diary_form.supper_recipes.push(attrId)
      }

      const formGroup = document.createElement('div');
      const icon = document.createElement('i');

      formGroup.innerHTML += `${attrName}`
      form.insertBefore(formGroup, saveBtn);
    }
  }

   // Save Diary
   saveDiary(e) {
     console.log(e)
     this.http.post(this.url, this.save_diary_form).subscribe(
      data => function (data) {
        this.token.handle(data.token);
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
