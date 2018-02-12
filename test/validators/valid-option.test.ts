import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validOption from "../../src/validators/valid-option";

const options = [
    {
        id: 1,
        name: "Test 1"
    },
    {
        id: 2,
        name: "Test 2"
    },
    {
        id: 3,
        name: "Test 3"
    }
];

@TestFixture()
export class RequiredNumberTests {

    @TestCase(1)
    @TestCase(2)
    @TestCase(3)
    public shouldPassForValidNumber(value: number) {
        const validator = validOption(options, o => o.id, "failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("ten")
    @TestCase(false)
    @TestCase(4)
    public shouldFailForInvalidNumber(value: any) {
        const failureMessage = "failure message";
        const validator = validOption(options, o => o.id, failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
