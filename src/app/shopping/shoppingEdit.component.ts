import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shoppingEdit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild('form') slForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing.subscribe(
			(index: number) => {
				this.editedItemIndex = index;
				this.editMode = true;
				this.editedItem = this.shoppingListService.getIngredient(index);
				this.slForm.setValue({
					name: this.editedItem.name,
					amount: this.editedItem.amount
				});
			}
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSubmit(form: NgForm) {
		const value = form.value,
			newIngredient = new Ingredient(value.name, value.amount);

		if (this.editMode) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredients(newIngredient);
		}


		this.editMode = false;
		form.reset();
	}

	onClear() {
		this.slForm.reset();
		this.editMode = false;
	}

	onDelete() {
		this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.onClear();
	}
}