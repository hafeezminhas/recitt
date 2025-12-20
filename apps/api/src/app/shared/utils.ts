import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/**
 * Converts JWT expiration time string to seconds.
 * @param time
 * @returns number of seconds
 */
export function jwtTimeToSeconds(time: string): number {
  const regex = /^(\d+)([smhd])$/;
  const match = time.match(regex);
  if (!match) {
    throw new Error('Invalid JWT expiration time format');
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 's':
      return value; // seconds
    case 'm':
      return value * 60; // minutes
    case 'h':
      return value * 3600; // hours
    case 'd':
      return value * 86400; // days
    default:
      throw new Error('Invalid time unit in JWT expiration time');
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}
