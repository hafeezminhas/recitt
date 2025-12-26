import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ApiError } from '@recitt/types';
import { TypedFormGroup, ValidatorModel } from './types/to-form-types';

export function createTypedFormGroup<T>(
  value: T,
  validators?: ValidatorModel<T>,
  groupValidators?: ValidatorFn[]
): TypedFormGroup<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const group: Record<string, any> = {};

  for (const key in value) {
    const v = value[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlValidators = (validators as any)?.[key];

    if (Array.isArray(v)) {
      group[key] = new FormArray(
        v.map((item) =>
          typeof item === 'object'
            ? createTypedFormGroup(item, controlValidators)
            : new FormControl(item, controlValidators)
        ),
        Array.isArray(controlValidators) ? null : controlValidators
      );
    } else if (v !== null && typeof v === 'object') {
      group[key] = createTypedFormGroup(v, controlValidators);
    } else {
      group[key] = new FormControl(v, controlValidators);
    }
  }

  return new FormGroup(group, groupValidators) as TypedFormGroup<T>;
}

export function normalizeError(err: HttpErrorResponse): ApiError {
  if (isApiError(err.error)) {
    return err.error;
  }

  return {
    statusCode: err.status,
    error: 'Unknown Error',
    message: 'An unexpected error occurred',
  };
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error
  );
}

export function matchPasswords(
  passwordKey: string,
  confirmKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const { password, confirmPassword } = formGroup.value;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      formGroup.get(confirmKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    if (formGroup.get(confirmKey)?.hasError('passwordMismatch')) {
      formGroup.get(confirmKey)?.setErrors({ passwordMismatch: null });
    }

    return null;
  };
}

// export function createNNFormGroup<T>(
//   fb: NonNullableFormBuilder,
//   value: T
// ): TypedFormGroup<T> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const controls: any = {};

//   for (const key in value) {
//     const v = value[key];

//     if (Array.isArray(v)) {
//       controls[key] = fb.array(
//         v.map(item =>
//           typeof item === 'object'
//             ? createNNFormGroup(fb, item)
//             : fb.control(item)
//         )
//       );
//     }
//     else if (v !== null && typeof v === 'object') {
//       controls[key] = createNNFormGroup(fb, v);
//     }
//     else {
//       controls[key] = fb.control(v);
//     }
//   }

//   return fb.group(controls) as TypedFormGroup<T>;
// }
