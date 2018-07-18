# @neworbit/validation

## Installation

    $ npm install @neworbit/validation --save

## Usage

### Overview

```typescript
import { validate } from "@neworbit/validation";

// Use createValidator to specify a rule and the message given for breaking that rule
const mustContainA = createValidator<string>(v => v.indexOf("A") !== -1, "Value must contain the letter 'a'");

// pass in array of validation functions and a value to validate
validate([ mustContainA ], "cheese"); // [ "Value must contain the letter 'a'" ] - returns error messages

// can use a factory pattern for your validation methods to make things nice
const mustContain = (requirement: any) => {
    return createValidator<string | Array<any>>(v => v.indexOf(requirement) !== -1, `Value must contain '${requirement}'`);
};

const lengthWithinBounds = (min: number, max: number) => {
    return createValidator<string>(v => v.length < min || v.length > max, `Value must have length between ${min} and ${max}`);
};

// you can pass in multiple validators
validate([ 
    mustContain("Z"), 
    lengthWithinBounds(2, 6)
], "Too long a string, they say!"); // [ "Value must contain 'Z'", "Value must have length between 2 and 6" ]
```

### Creating validation functions

A validation function must take in a value `value`, and return `Result.Pass` if `value` is valid, or `Result.Fail(message)` is `value` is invalid. They can also return `Result.Stop`, which will silently stop the validation cycle (no more errors).

This can be done with the helper method `createValidator` in `@neworbit/validation`:

```typescript
import { createValidator } from "@neworbit/validation";

const mustContainA = createValidator<string>(v => v.indexOf("A") !== -1, "Value must contain the letter 'a'");
```

You can use factory patterns around this to make it nicer:

```typescript
const mustContain = (requirement: any) => {
    return createValidator<string | Array<any>>(v => v.indexOf(requirement) !== -1, `Value must contain '${requirement}'`);
};
```

As of v4, all validators (except for validators that explicitly check for "required") should treat empty string, null and undefined
as valid.
This is because we can combine validators with "required" validators in order to enforce something being valid and not empty,
but also allows us to accept nothing being entered if desired.

### Options

The third parameter of `validate` is an object containing options.

```typescript
interface ValidationOptions {
    sequential?: boolean;
}
```

#### `sequential`

Default: `true`

The validation will break on the first error, therefore only returning a single validation error.

```typescript
validate([ something, another ], 5, { sequential: false });
```

If `something` fails validation, `another` will not be called.