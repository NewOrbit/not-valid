import { ValidationFail } from "./validation-fail";
import { ValidationResultType } from "./validation-result-type";

export interface ValidationResult {
    type: ValidationResultType;
}

export class Result {
    public static Pass: ValidationResult = { type: ValidationResultType.Pass };
    public static Stop: ValidationResult = { type: ValidationResultType.Stop };
    public static Fail: (message: string) => ValidationResult = (message: string) => new ValidationFail(message);
}
