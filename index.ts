type ValidationResult = string | null;
type ValidationPredicate<T> = (value: T) => boolean;
type ValidationFunction<T> = (value: T) => ValidationResult;

interface ValidationOptions {
    sequential?: boolean;
}

const DEFAULT_OPTIONS: ValidationOptions = {
    sequential: false
};

const getOptions = (options?: ValidationOptions) => {
    if (options === undefined) {
        return {
            sequential: DEFAULT_OPTIONS.sequential
        };
    }

    return {
        sequential: options.sequential || DEFAULT_OPTIONS.sequential
    };
};

const validate: <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => Array<string>
    = <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => {

    const opts = getOptions(options);

    const errors: Array<string> = [];

    for (const validator of validators) {
        const result = validator(value);

        // if the validator doesn't return null, then there was an error
        if (result !== null) {
            errors.push(result);

            if (opts.sequential) {
                break;
            }
        }
    }

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
};

export {
    ValidationResult,
    ValidationPredicate,
    ValidationFunction,
    ValidationOptions,
    validate,
    createValidator
};
