import { TestCase, TestFixture } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validVATNumber } from "../../src/validators/valid-vat-number";

@TestFixture("ValidAccountNumber")
export class ValidAccountNumberTests {

    @TestCase("123456789")
    @TestCase("")
    @TestCase(undefined)
    @TestCase(null)
    public shouldPassForValidAccountNumber(value: string) {
        const validator = validVATNumber("invalid vat number");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("123")
    @TestCase("abc")
    @TestCase("1234abcd")
    public shouldFailForInvalidVatNumber(value: string) {
        const failureMessage = "invalid vat number";
        const validator = validVATNumber(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
