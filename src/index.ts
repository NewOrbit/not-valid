import { ValidationResult, ValidationFail, ValidationResultType, Result } from "./results/";
import { getOptions, ValidationOptions } from "./options";

type ValidationPredicate<T> = (value: T) => boolean;
type SyncValidationFunction<T> = (value: T) => ValidationResult;
type AsyncValidationFunction<T> = (value: T) => Promise<ValidationResult>;
type ValidationFunction<T> = SyncValidationFunction<T> | AsyncValidationFunction<T>;
type ValidateFunction = <T>(validators: ValidationFunction<T>[], value: T, options?: ValidationOptions) => Promise<string[]>;

function isFailure(result: ValidationResult): result is ValidationFail {
    return result.type === ValidationResultType.Fail;
}

const validate: ValidateFunction = async <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => {
    const opts = getOptions(options);

    const errors: Array<string> = [];

    for (const validator of validators) {
        const result = await validator(value);

        if (isFailure(result)) {
            errors.push(result.message);

            if (opts.sequential) {
                break;
            }
        } else if (result.type === ValidationResultType.Stop) {
            break;
        }
    }

    return errors;
};

const createAsyncValidator = <T>(predicate: (value: T) => Promise<boolean>, message: string) => {
    const validationFunction: AsyncValidationFunction<T> = async (value: T) => {
        const result = await predicate(value);

        return result ? Result.Pass : Result.Fail(message);
    };

    return validationFunction;
};

const createValidator = <T>(predicate: ValidationPredicate<T>, message: string) => {
    const validationFunction: SyncValidationFunction<T> = (value: T) => {
        const result = predicate(value);

        return result ? Result.Pass : Result.Fail(message);
    };

    return validationFunction;
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
