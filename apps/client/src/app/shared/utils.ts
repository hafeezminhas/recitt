import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TypedFormGroup, ValidatorModel } from './types/to-form-types';

export function createTypedFormGroup<T>(
  value: T,
  validators?: ValidatorModel<T>
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

  return new FormGroup(group) as TypedFormGroup<T>;
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
