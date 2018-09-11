import { TestFixture, Test, TestCase } from "alsatian";
import { Expect } from "../utils/alsatian";
import { validEmail } from "../../src/validators/valid-email";

@TestFixture()
export class ValidEmailTests {

    @TestCase("foo@example.com")
    @TestCase("FOO.BAR@EXAMPLE.BAR.BAZ.COM")
    @TestCase("foo.bar@example.london")
    @TestCase("foo@foo.abcdefghijklmnopqrstuvwxyz")
    @TestCase("foo@123.com")
    @TestCase("123@example.com")
    @TestCase("foo-bar@baz-example.long-domain")
    @TestCase("-foo@example.com")
    @TestCase("foo-@example.com")
    @TestCase("!#$%&'*+-/=?^_`{|}~@example.com")
    @TestCase("")
    public shouldPassForValidEmail(value: string) {
        const validator = validEmail("failure message");
        const results = validator(value);
        Expect(results).toBeAPass();
    }

    @TestCase("foobar")
    @TestCase("foobar@")
    @TestCase("foobar@example")
    @TestCase("@example.com")
    @TestCase("foo.@example.com")
    @TestCase(".foo@example.com")
    @TestCase("foo@.example.com")
    @TestCase("foo@example.com.")
    @TestCase("foo@-example.com")
    @TestCase("foo@example.com-")
    @TestCase("foo@e*ample.com")
    @TestCase("foo@examp!e.com")
    @TestCase("foo@example.123")
    public shouldFailForInvalidEmail(value: string) {
        const failureMessage = "failure message";
        const validator = validEmail(failureMessage);
        const results = validator(value);
        Expect(results).toBeAFailWithMessage(failureMessage);
    }
}
