import { ValidationResult } from "./validation-result";
import { ValidationResultType } from "./validation-result-type";

class ValidationFail implements ValidationResult {
    public type = ValidationResultType.Fail;
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}

function isFailure(result: ValidationResult): result is ValidationFail {
    return result.type === ValidationResultType.Fail;
}

export {
    ValidationFail,
    isFailure
};
