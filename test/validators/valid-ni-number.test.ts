import { Test, TestCase, TestFixture } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validNINumber } from "../../src/validators/valid-ni-number";

@TestFixture("ValidNINumber")
export class ValidNINumberTests {

    @TestCase("AB123456C")
    @TestCase("CC987654D")
    @TestCase("ZA100000 ")
    @TestCase("")
    @TestCase(null)
    @TestCase(undefined)
    @Test("should pass for valid NI Number")
    public shouldPassForValidNINumber(niNumber: string) {
        const message = "Invalid NI Number";

        const validator = validNINumber(message);
        const results = validator(niNumber);
        Expect(results).toBeAPass();
    }

    @TestCase("DA123456A")
    @TestCase("AO123456B")
    @TestCase("ZZ0123456C")
    @TestCase("A1234")
    @Test("should fail for invalid length")
    public shouldFailForInvalidLength(value: string) {
        const message = "Invalid NI Number";

        const validator = validNINumber(message);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(message);
    }
}
