import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validPhoneNumber from "../../src/validators/valid-phone-number";
import { INVALID_PHONE_NUMBER } from "../../src/messages";

@TestFixture()
export class RequiredNumberTests {

    @TestCase("+447748998744")
    @TestCase("07748998744")
    @TestCase("0146071140")
    @TestCase("01460371140")
    @TestCase("01460 371140")
    public shouldPassForValidNumber(value: string) {
        const validator = validPhoneNumber();
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("ten")
    @TestCase("false")
    @TestCase("4")
    @TestCase("+044774899874")
    @TestCase("012")
    public shouldFailForInvalidNumber(value: string) {
        const validator = validPhoneNumber();
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(INVALID_PHONE_NUMBER);
    }
}
