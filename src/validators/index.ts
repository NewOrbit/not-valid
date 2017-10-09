import { requiredString, customRequiredString } from "./required-string";
import validEmail from "./valid-email";
import validPhoneNumber from "./valid-phone-number";
import requiredNumber from "./required-number";
import validSortCode from "./valid-sort-code";
import positiveNumber from "./positive-number";
import validMonetaryValue from "./valid-monetary-value";
import validOption from "./valid-option";
import drivingLicenceUk, { DRIVING_LICENCE_REGEX } from "./driving-licence";

export {
    drivingLicenceUk,
    DRIVING_LICENCE_REGEX,
    requiredString,
    customRequiredString,
    validEmail,
    validPhoneNumber,
    requiredNumber,
    validSortCode,
    positiveNumber,
    validMonetaryValue,
    validOption
};
