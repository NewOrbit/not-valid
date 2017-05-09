type ValidationResult = string | null;
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

export {
    ValidationResult,
    ValidationFunction,
    validate
};