import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validDrivingLicence from "../../src/validators/valid-driving-licence";

@TestFixture()
export class ValidDrivingLicenseTests {

    @TestCase("ABCDE948174ABCDE12")
    @TestCase("XYZAS281944IFJEE94")
    public shouldPassForValidDrivingLicence(value: string) {
        const validator = validDrivingLicence("failure message");

        const results = validator(value);

        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("     ")
    @TestCase(false)
    public shouldFailForInvalidDrivingLicence(value: any) {
        const failureMessage = "failure message";
        const validator = validDrivingLicence(failureMessage);

        const results = validator(value);

        Expect(results).toBeAFailWithMessage(failureMessage);
    }

}