import { createValidatorFactory } from "../create-validator";
import { REQUIRED_STRING } from "../messages";

export const requiredString = createValidatorFactory<string>(x => typeof x === "string" && x.trim().length > 0, REQUIRED_STRING);
