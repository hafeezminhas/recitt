import { Validators } from '@angular/forms';
import { ILoginRequest } from '@recitt/types';
import { ValidatorModel } from '@shared/types/to-form-types';

export const LoginFormValidationSchema: ValidatorModel<ILoginRequest> = {
  email: [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ],
  password: [Validators.required],
};
