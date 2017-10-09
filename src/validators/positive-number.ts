import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

export default createValidator<string>(s => {
    const parsed = parseInt(s);

    if (isNaN(parsed)) {
        return false;
    }

    if (parsed < 0) {
        return false;
    }

    return true;
}, Messages.REQUIRED_STRING);
