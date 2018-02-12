import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { REQUIRED_NUMBER } from "../messages";

export default createValidatorFactory<number>(x => typeof x === "number" && isFinite(x), REQUIRED_NUMBER);
