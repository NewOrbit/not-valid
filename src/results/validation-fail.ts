import { ValidationResult } from "./";

class ValidationFail implements ValidationResult {
    public type: string = "fail";
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export {
    ValidationFail
};
