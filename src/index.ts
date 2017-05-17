import { ValidationResult, ValidationFail, Result } from "./validation-result";

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

function isFailure(result: ValidationResult): result is ValidationFail {
    return (result as ValidationFail).message !== undefined;
}

const validate: <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => Array<string>
    = <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => {

    const opts = getOptions(options);

    const errors: Array<string> = [];

    for (const validator of validators) {
        const result = validator(value);
        
        if (isFailure(result)) {
            errors.push(result.message);

            if (opts.sequential) {
                break;
            }
        } else if (result.type === "stop") {
            break;
        }
    }

    return errors;
};

const createValidator: <T>(predicate: ValidationPredicate<T>, message: string) => ValidationFunction<T>
    = <T>(predicate: ValidationPredicate<T>, message: string) => {

    const failure = Result.Fail(message);

    return (value: T) => {
        if (predicate(value)) {
            return Result.Pass;
        }

        return failure;
    };
};

export {
    Result,
    ValidationPredicate,
    ValidationFunction,
    ValidationOptions,
    validate,
    createValidator
};
