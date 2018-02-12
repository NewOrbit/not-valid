import { IExpect, MixedMatcher, MatchError, buildExpect } from "alsatian";
import { ValidationResult, ValidationResultType, isFailure } from "../../src/results/";

class ValidationResultMatcher extends MixedMatcher {

    public toBeAPass() {
        if (this.actualValue.type !== ValidationResultType.Pass) {
            throw new MatchError("Validation result type was not a pass", ValidationResultType.Pass, this.actualValue.type);
        }
    }

    public toBeAStop() {
        if (this.actualValue.type !== ValidationResultType.Stop) {
            throw new MatchError("Validation result type was not a stop", ValidationResultType.Stop, this.actualValue.type);
        }
    }

    public toBeAFail() {
        if (isFailure(this.actualValue) === false) {
            throw new MatchError("Validation result type was not a fail", ValidationResultType.Fail, this.actualValue.type);
        }
    }

    public toBeAFailWithMessage(message: string) {
        if (isFailure(this.actualValue)) {
            if (this.actualValue.message !== message) {
                throw new MatchError("Validation failure did not have correct message", message, this.actualValue.message);
            }
        } else {
            throw new MatchError("Validation result type was not a fail", ValidationResultType.Fail, this.actualValue.type);
        }
    }
}

interface IValidationResultExpect extends IExpect {
    (test: ValidationResult): ValidationResultMatcher;
}

const Expect = buildExpect<IValidationResultExpect>(ValidationResultMatcher);

export {
    ValidationResultMatcher,
    IValidationResultExpect,
    Expect
};
