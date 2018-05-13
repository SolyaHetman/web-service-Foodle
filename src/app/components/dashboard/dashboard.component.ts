import { MorgningRecipes } from './../../models/morning-recipes';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Recipe } from '../../models/recipe';
import { GetRecipesService } from '../../services/get-recipes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { Diary } from '../../models/diary';
import { SaveDiaryService } from '../../services/save-diary.service';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[GetRecipesService, SaveDiaryService]
})
export class DashboardComponent implements OnInit {
  public recipes = [];
  public diaryItems = [];
  save;
  form: FormGroup;
  constructor(
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
      this.save = {
        name: '',
        morning_recipes: []
      }
      
  }
  // remove(event) {
  //   if (event.target.parentElement.classList.contains('form-group')) {
  //     console.log('Works');
  //   } else {console.log('Not work')}
  // }

  // Add to Diary Item
  onClick(event) {
    const form = document.getElementById('form');
    const parent = document.getElementById('form-parent');
    const saveBtn = document.getElementById('save-btn');

    if (event.target.parentElement.classList.contains('sportmenu-plus')) {
     
      // Get Name of Recipe
      let attrName = event.target.getAttribute('data-name');
      let attrId = event.target.getAttribute('data-id');
      
      // Create input
      const formGroup = document.createElement('div');
      const inputEl = document.createElement('input');
      const icon = document.createElement('i');

      // Div
      formGroup.classList.add('form-group','d-flex', 'align-items-center');

      // I
      icon.classList.add('fa','fa-minus-circle');
    
      // Insert input and icon to .form-group
      formGroup.innerHTML += `<input type="text" class="form-control" name="recipe-name" [(ngModel)]="save.morning_recipes" value="${attrName}" ng-reflect-model="${attrId}" readonly>
                              <i class="fa fa-minus-circle" aria-hidden="true" (click)="remove($event)"></i>
      `;
      // Insert .form-group to <form>
      form.insertBefore(formGroup,saveBtn );
      
    }
  }

   // Save Diary
   saveDiary() {
    this.saveDiaryService.saveNewDiary(this.save).subscribe(
        response => {
            console.log(`${this.save.name} has been added`);
        },
        error => {
          console.log('error', error);
        }
    )
  }
    

   
  }

  

  


