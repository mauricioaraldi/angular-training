import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipeEdit.component.html',
  styleUrls: ['./recipeEdit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
	recipeForm: FormGroup;

	constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;

			this.initForm();
		});
	}

	onSubmit() {
		this.recipeService.saveRecipe(this.id, this.recipeForm.value);
		this.onCancel();
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/)
				])
			})
		);
	}

	private initForm() {
		let recipe,
			ingredients = [];

		if (this.editMode) {
			recipe = this.recipeService.getRecipe(this.id);
		} else {
			recipe = new Recipe(null, null, null, []);
		}

		recipe.ingredients.forEach(ingredient => {
			ingredients.push(new FormGroup({
				name: new FormControl(ingredient.name, Validators.required),
				amount: new FormControl(ingredient.amount, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/)
				])
			}));
		});

		this.recipeForm = new FormGroup({
			name: new FormControl(recipe.name, Validators.required),
			imagePath: new FormControl(recipe.imagePath, Validators.required),
			description: new FormControl(recipe.description, Validators.required),
			ingredients: new FormArray(ingredients)
		});
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}
}