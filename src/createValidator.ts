import { ValidationResult, Result } from "./results/validation-result";
import { ValidationPredicate, AsyncValidationFunction, SyncValidationFunction } from "./types";

export const createAsyncValidator = <T>(predicate: (value: T) => Promise<boolean>, message: string) => {
    const validationFunction: AsyncValidationFunction<T> = async (value: T) => {
        const result = await predicate(value);

        return result ? Result.Pass : Result.Fail(message);
    };

    return validationFunction;
};

export const createValidator = <T>(predicate: ValidationPredicate<T>, message: string) => {
    const validationFunction: SyncValidationFunction<T> = (value: T) => {
        const result = predicate(value);

        return result ? Result.Pass : Result.Fail(message);
    };

    return validationFunction;
};