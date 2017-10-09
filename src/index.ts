/* tslint:disable:max-line-length */
import { ValidationResult, ValidationFail, ValidationResultType, Result } from "./results/";
import { getOptions, ValidationOptions } from "./options";
import { createAsyncValidator, createValidator } from "./createValidator";
import { ValidationPredicate, SyncValidationFunction, AsyncValidationFunction, ValidateFunction, ValidationFunction } from "./types";

function isFailure(result: ValidationResult): result is ValidationFail {
    return result.type === ValidationResultType.Fail;
}

const validate: ValidateFunction = async <T> (validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => {
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
    createAsyncValidator,
    ValidationResult
};
