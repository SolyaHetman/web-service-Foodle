import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

import { Recipe } from '../../models/recipe';
import { Diary } from '../../models/diary';
import { GetRecipesService } from '../../services/get-recipes.service';
import { MorgningRecipes } from './../../models/morning-recipes';
import { SaveDiaryService } from '../../services/save-diary.service';
import { TokenService } from '../../services/token.service';


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
    'date_from': '',
    'date_to': '',
    'morning_recipes': [],
    'lunch_recipes': [],
    'dinner_recipes': [],
    'supper_recipes': [],
  };
  // public token;

  private url: string = 'http://188.166.100.169:8080/api/v1/diaries/create/';

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private frmBuilder: FormBuilder, 
    private _getRecipe: GetRecipesService,
    private _elRef: ElementRef,
    private _titleService: Title,
    private token: TokenService,
    public elref: ElementRef, 
    public router: Router,
    public renderer: Renderer,
    public saveDiaryService: SaveDiaryService,
    public flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {

    this._titleService.setTitle('Dashboard');
    this._getRecipe.getRecipes()
      .subscribe(
        data => this.recipes = data
      );
  }
 

  // Add to Diary Item
  onSelectRecipe(event, type) {
    const form = document.getElementById('create-diary-form');
    const saveBtn = document.getElementById('save-btn');

    if (event.target.parentElement.classList.contains('sportmenu-plus')) {

      // Get Name of Recipe
      let attrName = event.target.getAttribute('data-name');
      let attrId = event.target.getAttribute('data-id');

      switch (type) {
        case "morning":{
          if (this.save_diary_form.morning_recipes.indexOf(attrId) === -1) {
            this.save_diary_form.morning_recipes.push(attrId);
          } else {
            this.flashMessagesService.show(`Ви вже вибрали цей рецепт`, { cssClass: 'alert-danger', timeout: 3000 });
            // this.raiseError("Ви вже вибрали цей рецепт");
            return;
          }
          break;
        }
        case "lunch":{
          if (this.save_diary_form.lunch_recipes.indexOf(attrId) === -1) {
            this.save_diary_form.lunch_recipes.push(attrId);
          } else {
            this.flashMessagesService.show(`Ви вже вибрали цей рецепт`, { cssClass: 'alert-danger', timeout: 3000 });
            return;
          }
          break;
        }
        case "dinner":{
          if (this.save_diary_form.dinner_recipes.indexOf(attrId) === -1) {
            this.save_diary_form.dinner_recipes.push(attrId);
          } else {
            this.flashMessagesService.show(`Ви вже вибрали цей рецепт`, { cssClass: 'alert-danger', timeout: 3000 });
            return;
          }
          break;
        }
        case "supper":{
          if (this.save_diary_form.supper_recipes.indexOf(attrId) === -1) {
            this.save_diary_form.supper_recipes.push(attrId);
          } else {
            this.flashMessagesService.show(`Ви вже вибрали цей рецепт`, { cssClass: 'alert-danger', timeout: 3000 });
            return;
          }
          break;
        }
      }

      const formGroup = document.createElement('div');
      const deleteButton = document.createElement('i');

      formGroup.innerHTML += `${attrName}`

      // Div
      formGroup.classList.add('form-group', 'd-flex', 'align-items-center', 'justify-content-between');

      deleteButton.classList.add('fa', 'fa-minus-circle', 'delete-btn');
      deleteButton.setAttribute('data-recipe-id', attrId);
      deleteButton.setAttribute('data-recipe-type', type);

      deleteButton.addEventListener('click', this.onDeleteRecipe.bind(this))

      formGroup.insertAdjacentElement('beforeend', deleteButton)

      form.insertBefore(formGroup, saveBtn);
    }
  }

  onDeleteRecipe(event) {
    let clickedButton = event.srcElement
    let id = clickedButton.getAttribute('data-recipe-id');
    let type = clickedButton.getAttribute('data-recipe-type');

    switch (type) {
      case "morning":{
        this.save_diary_form.morning_recipes = this.save_diary_form.morning_recipes.filter(item => item !== id);
        break;
      }
      case "lunch":{
        this.save_diary_form.lunch_recipes = this.save_diary_form.lunch_recipes.filter(item => item !== id);
        break;
      }
      case "dinner":{
        this.save_diary_form.dinner_recipes = this.save_diary_form.dinner_recipes.filter(item => item !== id);
        break;
      }
      case "supper":{
        this.save_diary_form.supper_recipes = this.save_diary_form.supper_recipes.filter(item => item !== id);
        break;
      }
    }
    clickedButton.parentElement.remove()
  }

  raiseError(errorMessage){
    console.log(errorMessage)
  }

  // Save Diary
  saveDiary(event) {
    this.saveDiaryService.saveNewDiary(this.save_diary_form).subscribe(
      data => this.handleRespone(data),
      error => {console.log(error.json())}
    )
    // return this.http.post(this.url, this.save_diary_form).subscribe(
    //   data => handleRespone(data)
    //     // this.token.handle(data.token);
    //     // this.router.navigate(['/diary']);
    //     // this.flashMessagesService.show(`Diary has been created`, { cssClass: 'alert-success', timeout: 3000 });
    //   // }
    // );
  }

  handleRespone(data) {
    // this.token.handle(data.token);
    // this.router.navigate(['/diary']);
    this.flashMessagesService.show(`Нове меню збережено`, { cssClass: 'alert-success', timeout: 3000 });
  }
}
