import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { INVALID_SORT_CODE } from "../messages";

const SORT_CODE_REGEX = /^\d{6}$/;

export default createValidatorFactory<string>(s => !s || SORT_CODE_REGEX.test(s), INVALID_SORT_CODE);
