import { ValidationResult } from "../results/validation-result";
import { createRegexValidator } from "../create-regex-validator";
import { VALID_ACCOUNT_NUMBER } from "../messages";

const ACCOUNT_NUMBER_REGEX = /^\d{8}$/;

export const validAccountNumber = createRegexValidator(ACCOUNT_NUMBER_REGEX, VALID_ACCOUNT_NUMBER);