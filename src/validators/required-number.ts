import { createValidatorFactory } from "../create-validator";
import { REQUIRED_NUMBER } from "../messages";

export const requiredNumber = createValidatorFactory<number>(x => typeof x === "number" && isFinite(x), REQUIRED_NUMBER);
