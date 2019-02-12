import { Component, Input } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipeItem.component.html'
})
export class RecipeItemComponent {
	@Input() recipe: Recipe;
	@Input() id: number;
}