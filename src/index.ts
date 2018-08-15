/* tslint:disable:max-line-length */
import { ValidationResult, ValidationFail, ValidationResultType, Result } from "./results/";
import { getOptions, ValidationOptions } from "./options";
import { ValidationPredicate, SyncValidationFunction, AsyncValidationFunction, ValidateFunction, ValidationFunction } from "./types";
import { createValidator, createValidatorFactory, createAsyncValidator, createAsyncValidatorFactory } from "./create-validator";
import { createRegexValidator } from "./create-regex-validator";
import * as messages from "./messages";
import * as validators from "./validators";

function isFailure(result: ValidationResult): result is ValidationFail {
    return result.type === ValidationResultType.Fail;
}

const validate: ValidateFunction = async <T> (validationFuncs: ValidationFunction<T>[], value: T, options?: ValidationOptions) => {
    const opts = getOptions(options);

    const errors: string[] = [];

    for (const validator of validationFuncs) {
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
    ValidationResult,
    createValidator,
    createValidatorFactory,
    createAsyncValidator,
    createAsyncValidatorFactory,
    createRegexValidator,
    messages,
    validators
};
