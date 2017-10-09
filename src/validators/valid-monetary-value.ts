import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

const CURRENCY_REGEX =
    /^\£?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;

export default createValidator<string>(s => CURRENCY_REGEX.test(s), Messages.VALID_MONETARY_VALUE);
