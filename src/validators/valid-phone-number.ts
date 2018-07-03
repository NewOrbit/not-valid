import { ValidationResult } from "../results/validation-result";
import { INVALID_PHONE_NUMBER } from "../messages";
import { createValidator } from "..";

const PHONE_NUMBER_REGEX = /^(0{0,2}|\+|[1-9])[1-9]\d*$/;

export default (minLength: number, message?: string) => {
    return createValidator<string>((phoneNumber: string) => {
        phoneNumber = phoneNumber.replace(/ /g, "");
        if (phoneNumber.length < minLength) {
            return false;
        }

        return !phoneNumber || PHONE_NUMBER_REGEX.test(phoneNumber);
    },
    message || INVALID_PHONE_NUMBER);
};
