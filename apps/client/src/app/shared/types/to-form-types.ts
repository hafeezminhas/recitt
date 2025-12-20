
// Create a type that converts a given interface's properties to FormControl or FormGroup types

import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type TypedForm<T> = {
  [K in keyof T]:
  T[K] extends Array<infer U>
  ? FormArray<TypedFormGroup<U>>
  : T[K] extends object
  ? TypedFormGroup<T[K]>
  : FormControl<T[K]>;
};

export type TypedFormGroup<T> = FormGroup<TypedForm<T>>;
