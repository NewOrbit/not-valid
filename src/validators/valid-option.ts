import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../createValidator";
﻿import * as Messages from "../messages";

export default <TOption, TValue>(options: Array<TOption>, valueSelector: (option: TOption) => TValue) => {
    const values = options.map(valueSelector);

    return createValidator<TValue>(v => values.indexOf(v) !== -1, Messages.CHOOSE_OPTION);
};
