import { createValidator } from "../create-validator";
import { CHOOSE_OPTION } from "../messages";

export const validOption = <TOption, TValue>(options: TOption[], valueSelector: (option: TOption) => TValue, message?: string) => {
    const values = options.map(valueSelector);

    return createValidator<TValue>((v: TValue) => values.indexOf(v) !== -1, message || CHOOSE_OPTION);
};
