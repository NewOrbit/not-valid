import { ValidationFail } from "./";

interface ValidationResult {
    type: string;
}

class Result {
    public static Pass: ValidationResult = { type: "pass" };
    public static Stop: ValidationResult = { type: "stop" };
    public static Fail: (message: string) => ValidationResult = (message: string) => new ValidationFail(message);
}

export {
    ValidationResult,
    Result
};
