import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service'

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipeList.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	subscription: Subscription;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.subscription = this.recipeService.recipesChanged.subscribe(
			(recipes: Recipe[]) => {
				this.recipes = recipes;
			}
		);

		this.recipes = this.recipeService.getRecipes();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}