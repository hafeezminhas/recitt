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
import { ILoginRequest } from '@recitt/types';
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
  loginForm = createTypedFormGroup<ILoginRequest>(
    {
      email: '',
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
      const { email, password } = this.loginForm.value;
      console.log(email, password);

      // this.authService
      //   .signIn(email, password)
      //   .pipe(finalize(() => (this.loading = false)))
      //   .subscribe(
      //     ({ apiKey }) => {
      //       console.log('Login successful', apiKey);

      //       // const redirectURL =
      //       //       this._activatedRoute.snapshot.queryParamMap.get(
      //       //           'redirectURL'
      //       //       ) || '/signed-in-redirect';

      //       //   // Navigate to the redirect url
      //       //   this._router.navigateByUrl(redirectURL);
      //     },
      //     ({ message, notification = 'error', validationErrors }) => {
      //       // console.log('Login failed', message, validationErrors, notification);

      //       this.alert = {
      //         type: notification,
      //         message: validationErrors ? validationErrors[0].message : message,
      //       };
      //       this.loginForm.enable();
      //       this.showAlert = true;
      //     }
      //   );
    }
  }
}
