import { createValidatorFactory } from "../create-validator";
import { INVALID_NI_NUMBER } from "../messages";
import validNino from "valid-nino";

export const validNiNumber = createValidatorFactory<string>(s => !s || validNino(s), INVALID_NI_NUMBER);
