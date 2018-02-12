import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validMonetaryValue from "../../src/validators/valid-monetary-value";

@TestFixture("validMonetaryValue")
export class ValidMonetaryValueTests {

    @Test("should pass for valid monetary value")
    @TestCase("10.12")
    @TestCase("£10.13")
    @TestCase("£12,345.67")
    @TestCase("10,000")
    @TestCase("1000")
    public shouldPassForValidMonetaryValue(value: string) {
        const validator = validMonetaryValue("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @Test("should fail for invalid monetary value")
    @TestCase(undefined)
    @TestCase(null)
    @TestCase(false)
    @TestCase("     ")
    @TestCase("12.3456")
    @TestCase("12,34")
    @TestCase("123,4")
    public shouldFailForInvalidMonetaryValue(value: any) {
        const failureMessage = "failure message";
        const validator = validMonetaryValue(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
