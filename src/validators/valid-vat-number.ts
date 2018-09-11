import { createRegexValidator } from "../create-regex-validator";
import { INVALID_VAT_NUMBER } from "../messages";

const VAT_NUMBER_REGEX = /^\d{9}$/;

export const validVATNumber = createRegexValidator(VAT_NUMBER_REGEX, INVALID_VAT_NUMBER);
