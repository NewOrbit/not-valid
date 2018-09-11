import { Result } from "./results/validation-result";
import { ValidationPredicate } from "./types";

export const createValidator = <T>(predicate: ValidationPredicate<T>, message: string) => {
    return (value: T) => {
        const result = predicate(value);
        return result ? Result.Pass : Result.Fail(message);
    };
};

export const createValidatorFactory = <T>(predicate: (value: T) => boolean, defaultMessage: string) => {
    return (message?: string) => createValidator(predicate, message || defaultMessage);
};

export const createAsyncValidator = <T>(predicate: (value: T) => Promise<boolean>, message: string) => {
    return async (value: T) => {
        const result = await predicate(value);
        return result ? Result.Pass : Result.Fail(message);
    };
};

export const createAsyncValidatorFactory = <T>(predicate: (value: T) => Promise<boolean>, defaultMessage: string) => {
    return (message?: string) => createAsyncValidator(predicate, message || defaultMessage);
};
