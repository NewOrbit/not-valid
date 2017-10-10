import { ValidationResult, Result } from "./results/validation-result";
import { ValidationPredicate, AsyncValidationFunction, SyncValidationFunction } from "./types";

const createValidatorFactory = <T>(predicate: ValidationPredicate<T>) => {
    /*const validationFunction: SyncValidationFunction<T> = (value: T, message: string) => {
        const result = predicate(value);

        return result ? Result.Pass : Result.Fail(message);
    };

    return validationFunction;*/

    return (message: string) => {
        return (value: T) => undefined;
    };
};

export {
    createValidatorFactory
};
