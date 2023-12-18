import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent {

  constructor(private formBuilder: FormBuilder) { };
  type: string[] = ["Type", "Film", "Série", "Episode"];
  fiche: string[] = ["Fiche", "Complète", "Courte"];
  selectedDate: number | null = null;
  newInput: string = '';

  orderForm = this.formBuilder.group({
    identifiant: ['', minRequired(this.newInput)],
    titre: ['', minRequired(this.newInput)],
    type: ['', Validators.required],
    year: [null, [Validators.required, dateValidator(this.selectedDate)]],
    fiche: ['', Validators.required],
    // payments: this.formBuilder.array([]),
  });
  ngOnInit() {
    // get Observable from FormGroup
    this.orderForm.valueChanges
      // listen to value change
      .subscribe(value => {
        console.log('orderForm value changes : ', value);
      });
  };
  onSubmit() {
    // Get form value as JSON object
    console.log('oderForm submitted : ', this.orderForm.value);
  };
};

export function dateValidator(selectedDate: number | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = control.value;
    const currentYear: number = new Date().getFullYear();
    if (selectedDate <= currentYear && selectedDate >= 1900) {
      return null;
    } else {
      return { 'incorrect': { value: control.value, expected: selectedDate } };
    }
  };
};

export function minRequired(newInput: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newInput = control.value;
    if (newInput !== '') {
      return null;
    } else {
      return { 'minRequired': { value: newInput, expected: newInput } };
    }
  };
};
