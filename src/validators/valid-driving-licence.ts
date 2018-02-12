import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { DRIVING_LICENCE } from "../messages";

const DRIVING_LICENCE_REGEX = /([a-zA-Z0-9]{5})([0-9]{6})([a-zA-Z0-9]{5})([0-9]{2})/m;

export default createValidatorFactory<string>(x => DRIVING_LICENCE_REGEX.test(x), DRIVING_LICENCE);
