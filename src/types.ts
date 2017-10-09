import { ValidationResult } from "./results";
import { ValidationOptions } from "./options";

export type ValidationPredicate<T> = (value: T) => boolean;
export type SyncValidationFunction<T> = (value: T) => ValidationResult;
export type AsyncValidationFunction<T> = (value: T) => Promise<ValidationResult>;
export type ValidationFunction<T> = SyncValidationFunction<T> | AsyncValidationFunction<T>;
export type ValidateFunction = <T>(validators: Array<ValidationFunction<T>>, value: T, options?: ValidationOptions) => Promise<Array<string>>;