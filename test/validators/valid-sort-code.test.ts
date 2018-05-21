import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validSortCode from "../../src/validators/valid-sort-code";

@TestFixture()
export class ValidSortCodeTests {

    @TestCase("123456")
    @TestCase("345612")
    public shouldPassForValidSortCode(value: string) {
        const validator = validSortCode("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("ten")
    @TestCase(false)
    @TestCase("1234567")
    @TestCase("12345")
    @TestCase("1234")
    @TestCase("123")
    @TestCase("12")
    @TestCase("1")
    public shouldFailForInvalidSortCode(value: string) {
        const failureMessage = "failure message";
        const validator = validSortCode(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
