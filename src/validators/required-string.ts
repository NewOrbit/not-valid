import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator-factory";

export default createValidatorFactory<string>(x => typeof x === "string" && x.trim().length > 0);