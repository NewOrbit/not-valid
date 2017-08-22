import { ValidationResult, ValidationFail, Result } from "./results/";
import { getOptions, ValidationOptions } from "./options";

type ValidationPredicate<T> = (value: T) => boolean;
type SyncValidationFunction<T> = (value: T) => ValidationResult;
type AsyncValidationFunction<T> = (value: T) => Promise<ValidationResult>;
type ValidationFunction<T> = SyncValidationFunction<T> | AsyncValidationFunction<T>;
type ValidateFunction<T> = (validators: ValidationFunction<T>[], value: T, options?: ValidationOptions) => Promise<string[]>;

function isFailure(result: ValidationResult): result is ValidationFail {
    return (result as ValidationFail).message !== undefined;
}

const validate: ValidateFunction<any>
    = async <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => {

    const opts = getOptions(options);

    const errors: Array<string> = [];

    for (const validator of validators) {
        const result = await validator(value);

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

const createAsyncValidator: <T>(predicate: (value: T) => Promise<boolean>, message: string) => AsyncValidationFunction<T>
    =  <T>(predicate: (value: T) => Promise<boolean>, message: string) => {

    return (value: T) => {
        return predicate(value)
            .then(result => {
                if (result) {
                    return Result.Pass;
                }

                return Result.Fail(message);
            });
    };
};

const createValidator: <T>(predicate: ValidationPredicate<T>, message: string) => SyncValidationFunction<T>
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
    AsyncValidationFunction,
    SyncValidationFunction,
    ValidationFunction,
    ValidationOptions,
    ValidateFunction,
    validate,
    createValidator,
    createAsyncValidator
};
