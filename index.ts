type ValidationResult = string | null;

interface ValidationFunction<T> {
  (value: T): string | null;
}

const validate = <T>(validators: Array<ValidationFunction<T>>, value: T) => {
    let errors: Array<ValidationResult> = [];
    
    validators.forEach(validator => {
        let result = validator(value);

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
}