import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from './../shared/ingredient.model';

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe(
			'Feijoada',
			'Feijoada brasileira completa',
			'https://scm-assets.constant.co/scm/unilever/1db348501df1238f872479d225e08c34/81124a76-89d0-4a13-8640-6916789ee09c.jpg',
			[new Ingredient('Feijão', 2), new Ingredient('Calabresa', 1), new Ingredient('Água', 1)]
		),
		new Recipe(
			'Arroz de China',
			'Arroz tradicional da cultura Gaúcha',
			'http://www.portaldasmissoes.com.br/uploads/empreendimentos/1649/0036114_regular_arroz-de-china-pobre-arroz-com-couve-arroz-com-linguica-arroz-campeiro-arroz-de-puta-pobre--(3).jpg',
			[new Ingredient('Arroz', 3), new Ingredient('Linguica', 1), new Ingredient('Cebola', 1)]
		)
	];

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(id: number) {
		return this.recipes[id];
	}

	saveRecipe(id: number, recipe: Recipe) {
		if (isNaN(id)) {
			this.recipes.push(recipe);
		} else {
			this.recipes[id] = recipe;
		}

		this.recipesChanged.next(this.getRecipes());
	}

	deleteRecipe(id: number) {
		this.recipes.splice(id, 1);
		this.recipesChanged.next(this.getRecipes());
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.getRecipes());
	}
}