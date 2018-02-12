import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { REQUIRED_STRING } from "../messages";

export default createValidatorFactory<string>(x => typeof x === "string" && x.trim().length > 0, REQUIRED_STRING);
