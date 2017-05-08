# @neworbit/validation

## Installation

    $ npm install @neworbit/validation --save

## Usage

```typescript
import { validate } from "@neworbit/validation";

// validation functions take a value and either return an error message or null
const mustContainA = (value: string) => value.indexOf("A") === -1 ? "Value must contain the letter 'a'" : null;

// pass in array of validation functions and a value to validate
validate([ mustContainA ], "cheese"); // [ "Value must contain the letter 'a'" ] - returns error messages

// can use a factory pattern for your validation methods to make things nice
const mustContain = (requirement: any) => {
    return (value: string | Array<any>) => value.indexOf("A") === -1 ? `Value must contain '${requirement}'` : null;
};

const lengthWithinBounds = (min: number, max: number) => {
    return (value: string) => value.length < min || value.length > max ? `Value must have length between ${min} and ${max}` : null;
};

// you can pass in multiple validators
validate([ 
    mustContain("Z"), 
    lengthWithinBounds(2, 6)
], "Too long a string, they say!"); // [ "Value must contain 'Z'", "Value must have length between 2 and 6" ]
```