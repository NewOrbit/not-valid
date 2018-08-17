import { TestCase, TestFixture, Test } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validAccountNumber } from "../../src/validators/valid-account-number";

@TestFixture("ValidAccountNumber")
export class ValidAccountNumberTests {

    @TestCase("12345678")
    @TestCase("")
    @TestCase(undefined)
    @TestCase(null)
    public shouldPassForValidAccountNumber(value: string) {
        const validator = validAccountNumber("invalid account number");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("123")
    @TestCase("abc")
    @TestCase("1234abcd")
    public shouldFailForInvalidAccountNumber(value: string) {
        const failureMessage = "invalid account number";
        const validator = validAccountNumber(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}