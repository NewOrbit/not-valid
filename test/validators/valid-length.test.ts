import { Test, TestCase, TestFixture } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validLength } from "../../src/validators/valid-length";

@TestFixture("ValidLength")
export class ValidLengthTests {

    @TestCase(2, 10, "12345")
    @TestCase(5, undefined, "12345")
    @TestCase(undefined, 6, "123")
    @Test("should pass for valid length")
    public shouldPassForValidLength(min: number, max: number, value: string) {
        const message = "Invalid length";

        const validator = validLength({
            min,
            max,
            message
        });

        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase(5, 8, "1234")
    @TestCase(5, undefined, "1")
    @TestCase(undefined, 8, "123456789")
    @Test("should fail for invalid length")
    public shouldFailForInvalidLength(min: number, max: number, value: string) {
        const message = "Invalid length";

        const validator = validLength({
            min,
            max,
            message
        });

        const results = validator(value);
        Expect(results).toBeAFailWithMessage(message);
    }

    @Test("should throw error if no min or max specified")
    public shouldThrowErrorIfNoMinOrMaxSpecified() {
        const message = "Invalid length";

        Expect(() => validLength({
            min: undefined,
            max: undefined,
            message
        })).toThrowError(Error, "No min or max specified");
    }

    @TestCase(3, "a")
    @TestCase(3, "abcdef")
    @TestCase(5, "xx")
    public shouldFailWithCorrectMessageIfMinAndMaxEqual(minMax: number, value: string) {
        const message = `Please enter ${minMax} characters`;

        const validator = validLength({
            min: minMax,
            max: minMax
        });

        const results = validator(value);
        Expect(results).toBeAFailWithMessage(message);
    }
}
