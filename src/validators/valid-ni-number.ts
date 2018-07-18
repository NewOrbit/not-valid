import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { INVALID_NI_NUMBER } from "../messages";
import validNino from "valid-nino";

export default createValidatorFactory<string>(s => !s || validNino(s), INVALID_NI_NUMBER);
