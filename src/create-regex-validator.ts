import { ValidationResult, Result } from "./results/validation-result";
import { createValidatorFactory } from "./create-validator";

export const createRegexValidator = (regex: RegExp, message: string) => createValidatorFactory<string>(s => !s || regex.test(s), message);
