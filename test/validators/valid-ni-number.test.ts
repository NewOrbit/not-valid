import { Test, TestCase, TestFixture } from "alsatian";
import { Expect } from "../utils/alsatian";
import validNiNumber from "../../src/validators/valid-ni-number";

@TestFixture("ValidNINumber")
export class ValidNINumberTests {

    @TestCase("AB123456C")
    @TestCase("CC987654D")
    @TestCase("ZA100000 ")
    @Test("should pass for valid NI Number")
    public shouldPassForValidNINumber(niNumber: string) {
        const message = "Invalid NI Number";

        const validator = validNiNumber(message);
        const results = validator(niNumber);
        Expect(results).toBeAPass();
    }

    @TestCase("DA123456A")
    @TestCase("AO123456B")
    @TestCase("ZZ0123456C")
    @TestCase("A1234")
    @Test("should fail for invalid length")
    public shouldFailForInvalidLength(min: number, max: number, value: string) {
        const message = "Invalid NI Number";

        const validator = validNiNumber(message);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(message);
    }
}
