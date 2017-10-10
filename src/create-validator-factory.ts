import { ValidationResult, Result } from "./results/validation-result";
import { ValidationPredicate, AsyncValidationFunction, SyncValidationFunction } from "./types";

const createValidatorFactory = <T>(predicate: ValidationPredicate<T>) => {
    return (message: string) => {
        const validationFunction = (value: T) => {
            const result = predicate(value);
    
            return result ? Result.Pass : Result.Fail(message);
        };
        
        return (value: T) => validationFunction(value);
    };
};

export {
    createValidatorFactory
};
