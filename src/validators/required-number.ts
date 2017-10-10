import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator-factory";

export default createValidatorFactory<number>(x => typeof x === "number");