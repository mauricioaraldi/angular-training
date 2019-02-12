import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from './recipe.model';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './../shopping/shoppingList.service';
import { RecipeService } from './recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html'
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(private shoppingListService: ShoppingListService,
				private route: ActivatedRoute,
				private recipeService: RecipeService,
				private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	toShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

	onDeleteRecipe() {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}
}