import {
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { TypedFormGroup } from './types/to-form-types';

export function createTypedFormGroup<T>(
  value: T
): TypedFormGroup<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls: Record<string, any> = {};

  for (const key in value) {
    const v = value[key];

    if (Array.isArray(v)) {
      controls[key] = new FormArray(
        v.map(item =>
          typeof item === 'object'
            ? createTypedFormGroup(item)
            : new FormControl(item)
        )
      );
    }
    else if (v !== null && typeof v === 'object') {
      controls[key] = createTypedFormGroup(v);
    }
    else {
      controls[key] = new FormControl(v);
    }
  }

  return new FormGroup(controls) as TypedFormGroup<T>;
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
