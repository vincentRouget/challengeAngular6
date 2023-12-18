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
  type: string[] = ["Film", "Série", "Episode"];
  fiche: string[] = ["Complète", "Courte"];
  selectedDate: number | null = null;
  newInput: string = '';

  orderForm = this.formBuilder.group({
    identifiant: ['', isRequiredValidator(this.newInput)],
    titre: ['', isRequiredValidator(this.newInput)],
    type: [''],
    year: [null, [Validators.required, rangeDateValidator(this.selectedDate)]],
    fiche: [''],
  });


  ngOnInit() {
    // get Observable from FormGroup
    this.patchDefaultValue();
    this.orderForm.valueChanges.subscribe(value => {
      console.log('orderForm value changes : ', value);
    });
  };

  patchDefaultValue(): void {
    this.orderForm.patchValue({
      type: this.type[1], // Set the default 'type' value
      fiche: this.fiche[1] // Set the default 'fiche' value
    });
    console.log('Default values set:', this.orderForm.value);
  }

  onSubmit() {
    // Get form value as JSON object
    console.log('oderForm submitted : ', this.orderForm.value);
  };
};

export function rangeDateValidator(selectedDate: number | null): ValidatorFn {
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

export function isRequiredValidator(newInput: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newInput = control.value;
    if (newInput !== '') {
      return null;
    } else {
      return { 'minRequired': { value: newInput, expected: newInput } };
    }
  };
};
