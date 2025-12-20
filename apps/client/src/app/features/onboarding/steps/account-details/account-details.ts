import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent } from "@coreui/angular";
import { BusinessAccountType, ICreateAccountRequest } from '@recitt/types';
import { createTypedFormGroup } from '@shared/utils';

@Component({
  selector: 'app-account-details',
  imports: [
    ReactiveFormsModule,
    ColComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    RowComponent
  ],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails {
  // convert BusinessAccountType enum to array for select options
  readonly businessAccountTypes = Object.values(BusinessAccountType).map((type) => ({
    label: type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    value: type,
  }));

  accountForm = createTypedFormGroup<ICreateAccountRequest>({
    name: '',
    registrationNumber: '',
    registrationType: BusinessAccountType.LIMITED_COMPANY,
    registrationDate: '',
    address: {
      building: '',
      street: '',
      town: '',
      county: '',
      postcode: '',
    },
    email: '',
    phone: '',
    alternatePhone: '',
    isVatRegistered: false,
    vatNumber: '',
  });
}

