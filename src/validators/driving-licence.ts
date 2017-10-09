import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

export const DRIVING_LICENCE_REGEX = /([a-zA-Z0-9]{5})([0-9]{6})([a-zA-Z0-9]{5})([0-9]{2})/m;

export default createValidator<string>(s => DRIVING_LICENCE_REGEX.test(s), Messages.DRIVING_LICENCE);
