import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { INVALID_NI_NUMBER } from "../messages";

const NI_NUMBER_REGEX = /^([ABCEGHJKLMNOPRSTWXYZ]{2})(\d{2})(\d{2})(\d{2})([ABCD ]?)$/i;

export default createValidatorFactory<string>(s => NI_NUMBER_REGEX.test(s), INVALID_NI_NUMBER);
