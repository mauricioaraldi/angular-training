import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipeStart.component';
import { RecipeListComponent } from './recipeList.component';
import { RecipeEditComponent } from './recipeEdit.component';
import { RecipeDetailComponent } from './recipeDetail.component';
import { RecipeItemComponent } from './recipeItem.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		RecipeComponent,
		RecipeStartComponent,
		RecipeListComponent,
		RecipeEditComponent,
		RecipeDetailComponent,
		RecipeItemComponent
	], imports: [
		CommonModule,
		ReactiveFormsModule,
		RecipesRoutingModule,
		SharedModule
	]
})
export class RecipesModule {}