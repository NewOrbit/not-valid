import { ValidationResult } from "../results/validation-result";
import { createRegexValidator } from "../create-regex-validator";
import { INVALID_BANK_ACCOUNT_NUMBER } from "../messages";

const BANK_ACCOUNT_NUMBER_REGEX = /^\d{8}$/;

export const validBankAccountNumber = createRegexValidator(BANK_ACCOUNT_NUMBER_REGEX, INVALID_BANK_ACCOUNT_NUMBER);
