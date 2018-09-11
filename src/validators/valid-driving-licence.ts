import { createValidator } from "../create-validator";
import { DRIVING_LICENCE } from "../messages";
import { SyncValidationFunction } from "..";

const regexes = {
    withIssueNumber: /^([a-zA-Z0-9]{5})([0-9]{6})([a-zA-Z0-9]{5})([0-9]{2})$/,
    withoutIssueNumber: /^([a-zA-Z0-9]{5})([0-9]{6})([a-zA-Z0-9]{5})$/,
    northernIreland: /^\d{8}$/
};

export type IssueNumberOptions = "required" | "optional" | "prohibited";

export interface DrivingLicenceOptions {
    message?: string;
    allowNI?: boolean;
    issueNumber?: IssueNumberOptions;
}

const defaultOptions: DrivingLicenceOptions = {
    allowNI: false,
    issueNumber: "optional"
};

function validateGB(value: string, options: DrivingLicenceOptions) {
    const { withIssueNumber, withoutIssueNumber } = regexes;
    switch (options.issueNumber) {
        case "required":
            return withIssueNumber.test(value);
        case "prohibited":
            return withoutIssueNumber.test(value);
        default:
            return withIssueNumber.test(value) || withoutIssueNumber.test(value);
    }
}

function validateNI(value: string) {
    return regexes.northernIreland.test(value);
}

function validate(value: string, options: DrivingLicenceOptions) {
    const isValidGBNumber = validateGB(value, options);
    if (!options.allowNI) {
        return isValidGBNumber;
    }
    return isValidGBNumber || validateNI(value);
}

function createWithOptions(options = defaultOptions) {
    return createValidator<string>(x => !x || validate(x, options), options.message || DRIVING_LICENCE);
}

function createWithString(message?: string) {
    return createWithOptions({ ...defaultOptions, message });
}

/**
 * Creates a driving licence validator with the default options and the provided message, or the default message if none is provided.
 * @param  {string} message The error message.
 */
function drivingLicenceUk(message?: string): SyncValidationFunction<string>;

// tslint:disable:max-line-length
/**
 * Creates a driving licence validator with the provided options.
 * @param {string} options.message A custom error message.
 * @param {string} options.allowNI Whether to allow Northern Ireland number formats. Default: false.
 * @param {IssueNumberOptions} options.issueNumber How to treat the issue number (the last two digits). Valid options: "optional" (default), "required", "prohibited".
 */
// tslint:enable:max-line-length
function drivingLicenceUk(options: DrivingLicenceOptions): SyncValidationFunction<string>;

function drivingLicenceUk(messageOrOptions?: string | DrivingLicenceOptions): SyncValidationFunction<string> {
    return typeof messageOrOptions === "string"
        ? createWithString(messageOrOptions as string)
        : createWithOptions(messageOrOptions as DrivingLicenceOptions);
}

export { drivingLicenceUk };
