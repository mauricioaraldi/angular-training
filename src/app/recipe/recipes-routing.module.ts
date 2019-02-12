import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipeStart.component';
import { RecipeEditComponent } from './recipeEdit.component';
import { RecipeDetailComponent } from './recipeDetail.component';
import { AuthGuard } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
	{path: '', component: RecipeComponent, children: [
		{path: '', component: RecipeStartComponent},
		{path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
		{path: ':id', component: RecipeDetailComponent},
		{path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
	]},
];

@NgModule({
	imports: [
		RouterModule.forChild(recipesRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthGuard
	]
})
export class RecipesRoutingModule {}