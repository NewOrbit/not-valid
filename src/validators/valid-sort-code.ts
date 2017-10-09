import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

const SORT_CODE_REGEX = /\d{6}/;

export default createValidator<string>(s => SORT_CODE_REGEX.test(s), Messages.INVALID_SORT_CODE);
