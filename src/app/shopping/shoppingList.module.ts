import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shoppingList.component';
import { ShoppingEditComponent } from './shoppingEdit.component';

@NgModule({
	declarations: [
		ShoppingEditComponent,
		ShoppingListComponent
	],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class ShoppingListModule {}