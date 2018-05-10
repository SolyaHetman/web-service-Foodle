import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Recipe } from '../../models/recipe';
import { GetRecipesService } from '../../services/get-recipes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[GetRecipesService]
})
export class DashboardComponent implements OnInit {
  public recipes = [];
  constructor(
    private _getRecipe: GetRecipesService
  ) { }

  ngOnInit() {
    this._getRecipe.getRecipes()
      .subscribe(
        data => console.log(this.recipes = data)
      );
    
  }

 


}
