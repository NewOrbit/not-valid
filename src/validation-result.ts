interface ValidationResult {
    type: string;
}

class ValidationFail implements ValidationResult {
    public type: string = "fail";
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class Result {
    public static Pass: ValidationResult = { type: "pass" };
    public static Stop: ValidationResult = { type: "stop" };
    public static Fail: (message: string) => ValidationResult = (message: string) => new ValidationFail(message);
}

export {
    ValidationResult,
    ValidationFail,
    Result
};
