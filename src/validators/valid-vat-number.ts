import { ValidationResult } from "../results/validation-result";
import { createRegexValidator } from "../create-regex-validator";
import { VALID_VAT_NUMBER } from "../messages";

const VAT_NUMBER_REGEX = /^\d{9}$/;

export const validVatNumber = createRegexValidator(VAT_NUMBER_REGEX, VALID_VAT_NUMBER);