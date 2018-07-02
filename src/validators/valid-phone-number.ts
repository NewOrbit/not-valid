import { ValidationResult } from "../results/validation-result";
import { createValidatorFactory } from "../create-validator";
import { INVALID_PHONE_NUMBER } from "../messages";

const PHONE_NUMBER_REGEX = /^(0{0,2}|\+|[1-9])[1-9]\d{7,}$/;

export default createValidatorFactory<string>(
    phoneNumber => {
        phoneNumber = phoneNumber.replace(/ /g, "");
        if (phoneNumber.length < 10) {
            return false;
        }

        return !phoneNumber || PHONE_NUMBER_REGEX.test(phoneNumber);
    },
    INVALID_PHONE_NUMBER);
