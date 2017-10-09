const stripCountryCode = (telNumber: string) => {
    let outNumber = telNumber;

    // remove the plus symbol
    if (outNumber.substr(0, 3) === "+44") {
        outNumber = outNumber.substring(1);
    }

    // remove 00
    if (outNumber.substr(0, 4) === "0044") {
        outNumber = outNumber.substring(2);
    }

    // replace 44 with 0
    if (outNumber.substr(0, 2) === "44") {
        outNumber = "0" + outNumber.substring(2);
    }

    return outNumber;
};

const isCorrectLengthWithCountryCodes = (telNumber: string) => telNumber.length >= 11;
const isCorrectLengthWithoutCountryCodes = (telNumber: string) => telNumber.length === 11;

const isNumbersOnly = (telNumber: string) => /^\d+$/.test(telNumber);

const validateMobileNumber = (registeredCodes: string, telNumber: string) => {
    telNumber = telNumber.replace(" ", "");

    // all UK numbers are at least 11 digits long
    if (!isCorrectLengthWithCountryCodes(telNumber)) {
        return false;
    }

    telNumber = stripCountryCode(telNumber);

    // country code is stripped out so it should be numbers only
    if (!isNumbersOnly(telNumber)) {
        return false;
    }

    if (!isCorrectLengthWithoutCountryCodes(telNumber)) {
        return false;
    }

    let codes: string[] = [];

    registeredCodes = registeredCodes.replace(/^\s+|\s+$/g, "");
    if (registeredCodes !== "") {
        codes = registeredCodes.split(",");
    }

    let stdCompareString = telNumber.substr(0, 5);
    if (codes.length > 0) {
        return codes.indexOf(stdCompareString) !== -1;
    }

    return telNumber.substr(0, 2) === "07";
};

export {
    validateMobileNumber
}