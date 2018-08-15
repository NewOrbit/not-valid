import { ValidationResult } from "../results/validation-result";
import { createRegexValidator } from "../../src";
import { VALID_ALPHANUMERIC } from "../messages";

const ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i;

export const validAlphanumeric = createRegexValidator(ALPHANUMERIC_REGEX, VALID_ALPHANUMERIC);
