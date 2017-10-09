const PHONE_REGEX = /^(0{0,2}|\+|[1-9])[1-9]\d{7,}$/;

const validatePhoneNumber = (telNumber: string) => {
    telNumber = telNumber.replace(/ /g, '');
    if (telNumber.length < 10) {
        return false;
    }

    return PHONE_REGEX.test(telNumber);
};

export {
    validatePhoneNumber
};
