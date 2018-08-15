import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validAlphanumeric } from "../../src/validators";

@TestFixture()
export class ValidAlphanumericTests {

    @TestCase("foobar123")
    @TestCase("FooBar123")
    public shouldPassForValidAlphanumeric(value: string) {
        const validator = validAlphanumeric("invalid alphanumeric");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("foobar 4212")
    @TestCase("foobar&$4212")
    @TestCase("*&%£*!")
    public shouldFailForInvalidAlphanumeric(value: string) {
        const failureMessage = "invalid alphanumeric";
        const validator = validAlphanumeric(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
