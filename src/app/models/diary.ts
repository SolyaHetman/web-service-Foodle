import { Dinner } from './dinner';
import { Lunch } from './lunch';
import { MorgningRecipes } from './morning-recipes';
import { User } from './user';
import { Supper } from './supper';

export class Diary {
    name: string;
    date_from: string;
    date_to: string;
    morning_recipes: MorgningRecipes;
    user: User;
    morning: MorgningRecipes;
    lunch_recipes: Lunch;
    dinner_recipes: Dinner;
    supper_recipes: Supper;
}