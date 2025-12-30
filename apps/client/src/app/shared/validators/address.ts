import { Validators } from '@angular/forms';

export const AddressValidator = {
  building: [Validators.required],
  street: [Validators.required],
  town: [Validators.required],
  county: [],
  postcode: [Validators.required],
};
