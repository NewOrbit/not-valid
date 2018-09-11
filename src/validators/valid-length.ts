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
        return `Please enter at least ${min} and no more than ${max} characters`;
    } else if (min) {
        return `Please enter at least ${min} characters`;
    } else if (max) {
        return `Please enter no more than ${max} characters`;
    }

    // we should never get here
    return "";
};

export const validLength = (options: ValidLengthOptions) => {
    if (!options.min && !options.max) {
        throw new Error("No min or max specified");
    }

    return createValidator<string>(s =>
        (options.min === undefined || s.length >= options.min) && (options.max === undefined || s.length <= options.max)
        , getMessage(options)
    );
};
