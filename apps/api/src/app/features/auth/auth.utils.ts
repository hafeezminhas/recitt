import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEmailOrUsernameConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown) {
    if (typeof value !== 'string') return false;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);

    return isEmail || isUsername;
  }

  defaultMessage() {
    return 'Must be a valid email or username (3–20 characters, letters/numbers/underscores only)';
  }
}

export function IsEmailOrUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailOrUsernameConstraint,
    });
  };
}

export function generateOTP(): number {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
