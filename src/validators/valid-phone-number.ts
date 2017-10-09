import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";
import { validatePhoneNumber } from "./phoneValidation";

export default createValidator<string>(
    v => {
        // if no phone number given, assume true as it should be caught elsewhere
        if (!v) {
            return true;
        }

        return validatePhoneNumber(v);
    },
    Messages.INVALID_PHONE_NUMBER
);
