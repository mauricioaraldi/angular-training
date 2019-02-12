import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Injectable()
export class DataStorageService {
	constructor(private httpClient:HttpClient, private recipeService: RecipeService) {}

	storeRecipes() {
		const req = new HttpRequest(
				'PUT',
				null,
				this.recipeService.getRecipes(),
				{
					reportProgress: true
				}
			);

		return this.httpClient.request(req);
	}

	fetchRecipes() {
		this.httpClient.get<Recipe[]>(null).map(recipes => {
			for (let recipe of recipes) {
				recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
			}

			return recipes;
		})
		.subscribe((recipes: Recipe[]) => {
			this.recipeService.setRecipes(recipes);
		});
	}
}