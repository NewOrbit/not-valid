import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import requiredString from "../../src/validators/required-string";

@TestFixture()
export class RequiredStringTests {

    @TestCase("ajsidfheuhfues")
    @TestCase("foo bar")
    @TestCase("1487358")
    public shouldPassForValidString(value: string) {
        const validator = requiredString("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("")
    @TestCase(false)
    @TestCase("     ")
    @TestCase(56)
    public shouldFailForInvalidString(value: any) {
        const failureMessage = "failure message";
        const validator = requiredString(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
