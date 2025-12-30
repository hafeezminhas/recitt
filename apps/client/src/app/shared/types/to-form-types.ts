
// Create a type that converts a given interface's properties to FormControl or FormGroup types

import { FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export type TypedForm<T> = {
  [K in keyof T]:
  T[K] extends Array<infer U>
  ? FormArray<TypedFormGroup<U>>
  : T[K] extends object
  ? TypedFormGroup<T[K]>
  : FormControl<T[K]>;
};

export type TypedFormGroup<T> = FormGroup<TypedForm<T>>;

export type ValidatorModel<T> = {
  [K in keyof T]?: T[K] extends Array<any>
  ? ValidatorFn | ValidatorFn[] // Validators for the FormArray itself
  : T[K] extends object
  ? ValidatorModel<T[K]> // Recursive for nested groups
  : ValidatorFn | ValidatorFn[]; // Validators for individual controls
};
