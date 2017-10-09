import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

export default createValidator<number>(s => s !== null && s !== undefined, Messages.REQUIRED_NUMBER);
