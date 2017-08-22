import { ValidationFail } from "./validation-fail";
import { ValidationResultType } from "./validation-result-type";

interface ValidationResult {
    type: ValidationResultType;
}

class Result {
    public static Pass: ValidationResult = { type: ValidationResultType.Pass };
    public static Stop: ValidationResult = { type: ValidationResultType.Stop };
    public static Fail: (message: string) => ValidationResult = (message: string) => new ValidationFail(message);
}

export {
    ValidationResult,
    Result
};
