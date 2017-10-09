import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

const customRequiredString = (message: string) => {
    return createValidator<string>(s => {
        return !!s && s.trim().length > 0;
    }, message);
};

const requiredString = customRequiredString(Messages.REQUIRED_STRING);

export {
    requiredString,
    customRequiredString
}
