import { ValidationResult } from "../results/validation-result";
import { createValidator } from "../create-validator";

export interface ValidLengthOptions {
    min?: number;
    max?: number;
    message?: string;
}

const getMessage = ({ min, max, message }: ValidLengthOptions): string => {
    if (message) {
        return message;
    }

    if (max && min) {
        return `Please enter a length greater than ${min} or less than ${max}`;
    } else if (min) {
        return `Please enter a length greater than ${min}`;
    } else if (max) {
        return `Please enter a length less than ${max}`
    }

    return "Please enter a valid length";
};

export const validLength = (options: ValidLengthOptions) => {
    return createValidator<string>(s =>
        (options.min === undefined || s.length >= options.min) && (options.max === undefined || s.length <= options.max)
        , getMessage(options)
    );
}
