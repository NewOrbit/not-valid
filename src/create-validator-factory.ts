import { ValidationResult, Result } from "./results/validation-result";
import { ValidationPredicate, AsyncValidationFunction, SyncValidationFunction } from "./types";

const createValidatorFactory = <T>(predicate: (value: T) => boolean) => {
    return (message: string) => {        
        return (value: T) => {
            const result = predicate(value);
    
            return result ? Result.Pass : Result.Fail(message);
        };
    };
};

const createAsyncValidatorFactory = <T>(predicate: (value: T) => Promise<boolean>) => {
    return (message: string) => {
        return async (value: T) => {
            const result = await predicate(value);
    
            return result ? Result.Pass : Result.Fail(message);
        };
    };
};

export {
    createValidatorFactory,
    createAsyncValidatorFactory
};
