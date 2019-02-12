import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping/shoppingList.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'recipes', loadChildren: './recipe/recipes.module#RecipesModule'},
	{path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}