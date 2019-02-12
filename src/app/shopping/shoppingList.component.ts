import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shoppingList.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[];
	private subscription: Subscription;

	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();

		this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
			this.ingredients = ingredients;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onEditItem(index: number) {
		this.shoppingListService.startedEditing.next(index);
	}
}