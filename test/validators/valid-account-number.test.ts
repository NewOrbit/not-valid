import { TestCase, TestFixture, Test } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validBankAccountNumber } from "../../src/validators/valid-bank-account-number";

@TestFixture("ValidBankAccountNumber")
export class ValidBankAccountNumberTests {

    @TestCase("12345678")
    @TestCase("")
    @TestCase(undefined)
    @TestCase(null)
    public shouldPassForValidAccountNumber(value: string) {
        const validator = validBankAccountNumber("invalid account number");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("123")
    @TestCase("abc")
    @TestCase("1234abcd")
    public shouldFailForInvalidAccountNumber(value: string) {
        const failureMessage = "invalid account number";
        const validator = validBankAccountNumber(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
