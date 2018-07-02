import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validPhoneNumber from "../../src/validators/valid-phone-number";
import { INVALID_PHONE_NUMBER } from "../../src/messages";

@TestFixture()
export class RequiredNumberTests {

    @TestCase("+447748998744", 10)
    @TestCase("07748998744", 10)
    @TestCase("0146071140", 10)
    @TestCase("01460371140", 10)
    @TestCase("01460 371140", 10)
    @TestCase("014", 3)
    public shouldPassForValidNumber(value: string, minLength: number) {
        const validator = validPhoneNumber(minLength);
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("ten", 10)
    @TestCase("false", 10)
    @TestCase("4", 10)
    @TestCase("+044774899874", 10)
    @TestCase("012", 10)
    @TestCase("01460 71140", 11)
    public shouldFailForInvalidNumber(value: string, minLength: number) {
        const message = "Test invalid message";
        const validator = validPhoneNumber(minLength, message);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(message);
    }
}
