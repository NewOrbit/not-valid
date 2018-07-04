import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import validDrivingLicence, { DrivingLicenceOptions } from "../../src/validators/valid-driving-licence";
import { DRIVING_LICENCE } from "../../src/messages";

@TestFixture()
export class ValidDrivingLicenseTests {

    @TestCase("ABCDE948174ABCDE12")
    @TestCase("XYZAS281944IFJEE94")
    @TestCase("ABCDE948174AB1DE")
    @TestCase("XYZAS281944IFJEE")
    @TestCase("")
    public shouldPassForValidDrivingLicence(value: string) {
        const validator = validDrivingLicence("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase(undefined)
    @TestCase(null)
    @TestCase("     ")
    @TestCase(false)
    @TestCase("ABCDE948174ABCD")
    @TestCase("12345AAAAA12ABC")
    @TestCase("fooABCDE948174ABCDE12bar")
    @TestCase("12345678")
    public shouldFailForInvalidDrivingLicence(value: any) {
        const failureMessage = "failure message";
        const validator = validDrivingLicence(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }

    @TestCase("ABCDE123456EF7GH", { issueNumber: "optional" })
    @TestCase("ABCDE123456EF7GH", { issueNumber: "prohibited" })
    @TestCase("ABCDE123456EF7GH12", { issueNumber: "optional" })
    @TestCase("ABCDE123456EF7GH12", { issueNumber: "required" })
    @TestCase("12345678", { allowNI: true })
    @TestCase("ABCDE123456EF7GH", { allowNI: true })
    @TestCase("ABCDE123456EF7GH12", { allowNI: true })
    public shouldPassForValidDrivingLicenceWithOptions(value: string, options: DrivingLicenceOptions) {
        const validator = validDrivingLicence(options);
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("ABCDE123456EF7GH", { issueNumber: "required" })
    @TestCase("ABCDE123456EF7GH12", { issueNumber: "prohibited" })
    @TestCase("12345678", { allowNI: false })
    @TestCase("1234567", { allowNI: true })
    @TestCase("123456789", { allowNI: true })
    public shouldFailForInvalidDrivingLicenceWithOptions(value: any, options: DrivingLicenceOptions) {
        const failureMessage = "failure message";
        const validator = validDrivingLicence({ ...options, message: failureMessage });
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }

    public shouldUseDefaultErrorMessageIfNoneIsProvided() {
        const validator = validDrivingLicence();
        const results = validator("foo bar");
        Expect(results).toBeAFailWithMessage(DRIVING_LICENCE);
    }

    public shouldUseDefaultErrorMessageIfNoneIsProvidedInOptions() {
        const validator = validDrivingLicence({ issueNumber: "optional" });
        const results = validator("foo bar");
        Expect(results).toBeAFailWithMessage(DRIVING_LICENCE);
    }
}
