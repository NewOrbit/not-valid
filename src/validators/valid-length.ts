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
        if (max === min) {
            return `Please enter ${max} characters`;
        }

        return `Please enter at least ${min} and no more than ${max} characters`;
    }

    if (min) {
        return `Please enter at least ${min} characters`;
    }

    return `Please enter no more than ${max} characters`;
};

export const validLength = (options: ValidLengthOptions) => {
    if (!options.min && !options.max) {
        throw new Error("No min or max specified");
    }

    return createValidator<string>(s =>
        !s
        || ((options.min === undefined || s.length >= options.min) && (options.max === undefined || s.length <= options.max))
        , getMessage(options)
    );
};
