import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import requiredNumber from "../../src/validators/required-number";

@TestFixture()
export class RequiredNumberTests {

    @TestCase(10)
    @TestCase(200)
    public shouldPassForValidNumber(value: number) {
        const validator = requiredNumber("failure message");

        const results = validator(value);

        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("ten")
    @TestCase(false)
    public shouldFailForInvalidNumber(value: any) {
        const failureMessage = "failure message";
        const validator = requiredNumber(failureMessage);

        const results = validator(value);

        Expect(results).toBeAFailWithMessage(failureMessage);
    }

}