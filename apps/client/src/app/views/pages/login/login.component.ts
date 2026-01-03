import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormFeedbackComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { environment } from '@env/environment.development';
import { ICredentials } from '@recitt/types';
import { createTypedFormGroup } from '@shared/utils';
import { LoginFormValidationSchema } from '@shared/validators/login';

const { credentials } = environment;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    ReactiveFormsModule,
    FormFeedbackComponent,
    // AlertComponent,
  ],
})
export class LoginComponent {
  loginForm = createTypedFormGroup<ICredentials>(
    {
      username: '',
      password: '',
    },
    LoginFormValidationSchema
  );
  submitted = false;
  loading = false;

  get f() {
    return this.loginForm.controls;
  }

  constructor() {
    // Pre-fill the form with credentials from environment
    if (credentials) {
      this.loginForm.patchValue(credentials);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      // this.loginForm.disable();
      this.loading = true;
      const { username, password } = this.loginForm.value;
    }
  }
}
