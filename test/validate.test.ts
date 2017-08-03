import { TestFixture, Test, TestCase, Expect } from "alsatian";
import { validate, Result } from "../src/index";

@TestFixture()
export class ValidationTests {

    @Test()
    public shouldReturnEmptyArrayIfNoValidators() {
        const result = validate([], 0);

        Expect(result).toEqual([]);
    }

    @TestCase("an error occured")
    @TestCase("foo")
    public shouldReturnError(message: string) {
        const result = validate([
            () => Result.Fail(message)
        ], 0);

        Expect(result).toEqual([ message ]);
    }

    @TestCase("foo")
    @TestCase("404 document not found")
    public shouldOnlyReturnFirstError(message: string) {
        const result = validate([
            () => Result.Fail(message), () => Result.Fail("foo")
        ], 0);

        Expect(result).toEqual([ message ]);
    }

    @TestCase("foo", "bar")
    @TestCase("404 document not found", "500 error")
    public shouldReturnAllErrorsIfNotSequential(firstMessage: string, secondMessage: string) {
        const result = validate([
            () => Result.Fail(firstMessage), () => Result.Fail(secondMessage)
        ], 0, { sequential: false });

        Expect(result).toEqual([ firstMessage, secondMessage ]);
    }

    @TestCase("baz baz baz")
    @TestCase("ice cream and brie")
    public shouldNotReturnErrorForPass(secondMessage: string) {
        const result = validate([
            () => Result.Pass, () => Result.Fail(secondMessage)
        ], 0);

        Expect(result).toEqual([ secondMessage ]);
    }

    @TestCase(1)
    @TestCase(2)
    public shouldCallFirstValidatorWithValue(value: number) {
        let calledCorrectly = false;
        const validator = (receivedValue: number) => {
            if (receivedValue === value) {
                calledCorrectly = true;
            }

            return Result.Pass;
        };

        validate([
            validator, () => Result.Pass
        ], value);

        Expect(calledCorrectly).toBe(true);
    }

    @TestCase(1)
    @TestCase(2)
    public shouldCallSecondValidatorWithValueIfFirstPasses(value: number) {
        let calledCorrectly = false;
        const validator = (receivedValue: number) => {
            if (receivedValue === value) {
                calledCorrectly = true;
            }

            return Result.Pass;
        };

        validate([
            () => Result.Pass, validator
        ], value);

        Expect(calledCorrectly).toBe(true);
    }

    @Test()
    public shouldStopAtFirstFail() {
        const value = 5;

        let firstValidatorCalled = false;
        const firstValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                firstValidatorCalled = true;
            }

            return Result.Fail("return an error here");
        };

        let secondValidatorCalled = false;
        const secondValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                secondValidatorCalled = true;
            }

            return Result.Pass;
        };

        validate([ firstValidator, secondValidator ], value);

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(false);
    }

    @Test()
    public shouldNotStopAtFirstFailIfSequentialFalse() {
        const value = 5;

        let firstValidatorCalled = false;
        const firstValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                firstValidatorCalled = true;
            }

            return Result.Fail("return an error here");
        };

        let secondValidatorCalled = false;
        const secondValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                secondValidatorCalled = true;
            }

            return Result.Pass;
        };

        validate([ firstValidator, secondValidator ],
            value, { sequential: false });

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(true);
    }

    @Test()
    public shouldNotCallSecondValidatorIfFirstStops() {
        const value = 5;

        let firstValidatorCalled = false;
        const firstValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                firstValidatorCalled = true;
            }

            return Result.Stop;
        };

        let secondValidatorCalled = false;
        const secondValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                secondValidatorCalled = true;
            }

            return Result.Pass;
        };

        validate([ firstValidator, secondValidator ], value);

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(false);
    }

}
