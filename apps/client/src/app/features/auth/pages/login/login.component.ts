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
  SpinnerComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { environment } from '@env/environment.development';
import { AuthFacade } from '@features/auth/+state/auth.facade';
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
    SpinnerComponent,
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
  loading$$ = this.authFacade.isLoading$$;
  error$$ = this.authFacade.error$$;

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

  constructor(private authFacade: AuthFacade) {
    // Pre-fill the form with credentials from environment
    if (credentials) {
      this.loginForm.patchValue(credentials);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.getRawValue());
    }
  }
}
