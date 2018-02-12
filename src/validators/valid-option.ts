import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../create-validator";
import { CHOOSE_OPTION } from "../messages";

export default <TOption, TValue>(options: TOption[], valueSelector: (option: TOption) => TValue, message?: string) => {
    const values = options.map(valueSelector);

    return createValidator<TValue>((v: TValue) => values.indexOf(v) !== -1, message || CHOOSE_OPTION);
};
