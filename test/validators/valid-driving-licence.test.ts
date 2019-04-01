import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validUKDrivingLicence, DrivingLicenceOptions } from "../../src/validators/valid-driving-licence";
import { DRIVING_LICENCE } from "../../src/messages";

@TestFixture()
export class ValidDrivingLicenseTests {

    @TestCase("AA999123456A9AAA")
    @TestCase("AA999123456A9AA1")
    @TestCase("AA999123456A9A12")
    @TestCase("AA999123456A9123")
    @TestCase("AA999123456AAAAA")
    @TestCase("AA999123456AAAA1")
    @TestCase("AA999123456AAA12")
    @TestCase("AA999123456AA123")
    @TestCase("AAA99123456A9AAA")
    @TestCase("AAA99123456A9AA1")
    @TestCase("AAA99123456A9A12")
    @TestCase("AAA99123456A9123")
    @TestCase("AAA99123456AAAAA")
    @TestCase("AAA99123456AAAA1")
    @TestCase("AAA99123456AAA12")
    @TestCase("AAA99123456AA123")
    @TestCase("AAAA9123456A9AAA")
    @TestCase("AAAA9123456A9AA1")
    @TestCase("AAAA9123456A9A12")
    @TestCase("AAAA9123456A9123")
    @TestCase("AAAA9123456AAAAA")
    @TestCase("AAAA9123456AAAA1")
    @TestCase("AAAA9123456AAA12")
    @TestCase("AAAA9123456AA123")
    @TestCase("AAAAA123456A9AAA")
    @TestCase("AAAAA123456A9AA1")
    @TestCase("AAAAA123456A9A12")
    @TestCase("AAAAA123456A9123")
    @TestCase("AAAAA123456AAAAA")
    @TestCase("AAAAA123456AAAA1")
    @TestCase("AAAAA123456AAA12")
    @TestCase("AAAAA123456AA123")
    @TestCase("aaaaa123456AAAAA")
    @TestCase("ABCDE948174ABCDE12")
    @TestCase("XYZAS281944IFJEE94")
    @TestCase("ABCDE948174AB1DE")
    @TestCase("XYZAS281944IFJEE")
    @TestCase("")
    @TestCase(undefined)
    @TestCase(null)
    public shouldPassForValidDrivingLicence(value: string) {
        const validator = validUKDrivingLicence("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("     ")
    @TestCase("ABCDE948174ABCD")
    @TestCase("12345AAAAA12ABC")
    @TestCase("fooABCDE948174ABCDE12bar")
    @TestCase("9A999123456A9AAA")
    @TestCase("A9999123456A9AAA")
    @TestCase("AA999A23456A9AAA")
    @TestCase("AA9991A3456A9AAA")
    @TestCase("AA99912A456A9AAA")
    @TestCase("AA999123A56A9AAA")
    @TestCase("AA9991234A6A9AAA")
    @TestCase("AA99912345AA9AAA")
    @TestCase("AA99912345699AAA")
    @TestCase("AA999123456A9AA")
    @TestCase("AA999123456A9AAAAA")
    @TestCase("1234567890123456")
    @TestCase("!A999123456A9AAA")
    @TestCase("$A999123456A9AAA")
    @TestCase("12345678")
    public shouldFailForInvalidDrivingLicence(value: any) {
        const failureMessage = "failure message";
        const validator = validUKDrivingLicence(failureMessage);
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
        const validator = validUKDrivingLicence(options);
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
        const validator = validUKDrivingLicence({ ...options, message: failureMessage });
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }

    public shouldUseDefaultErrorMessageIfNoneIsProvided() {
        const validator = validUKDrivingLicence();
        const results = validator("foo bar");
        Expect(results).toBeAFailWithMessage(DRIVING_LICENCE);
    }

    public shouldUseDefaultErrorMessageIfNoneIsProvidedInOptions() {
        const validator = validUKDrivingLicence({ issueNumber: "optional" });
        const results = validator("foo bar");
        Expect(results).toBeAFailWithMessage(DRIVING_LICENCE);
    }
}
