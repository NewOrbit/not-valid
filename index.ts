type ValidationResult = string | null;
type ValidationPredicate<T> = (value: T) => boolean;
type ValidationFunction<T> = (value: T) => ValidationResult;

const validate: <T>(validators: Array<ValidationFunction<T>>, value: T) => Array<ValidationResult>
    = <T>(validators: Array<ValidationFunction<T>>, value: T) => {

    const errors: Array<ValidationResult> = [];

    validators.forEach(validator => {
        const result = validator(value);

        // if the validator doesn't return null, then there was an error
        if (result !== null) {
            errors.push(result);
        }
    });

    return errors;
};

const createValidator: <T>(predicate: ValidationPredicate<T>, message: string) => ValidationFunction<T>
    = <T>(predicate: ValidationPredicate<T>, message: string) => {

    return (value: T) => {
        if (predicate(value)) {
            return null;
        }

        return message;
    };
}

export {
    ValidationResult,
    ValidationPredicate,
    ValidationFunction,
    validate,
    createValidator
};