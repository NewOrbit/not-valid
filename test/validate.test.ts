import { TestFixture, Test, TestCase, Expect, AsyncTest } from "alsatian";
import { validate, Result } from "../src/index";

@TestFixture()
export class ValidationTests {

    @AsyncTest()
    public async shouldReturnEmptyArrayIfNoValidators() {
        const result = await validate([], 0);

        Expect(result).toEqual([]);
    }

    @AsyncTest()
    @TestCase("an error occured")
    @TestCase("foo")
    public async shouldReturnError(message: string) {
        const result = await validate([
            () => Result.Fail(message)
        ], 0);

        Expect(result).toEqual([ message ]);
    }

    @AsyncTest()
    @TestCase("foo")
    @TestCase("404 document not found")
    public async shouldOnlyReturnFirstError(message: string) {
        const result = await validate([
            () => Result.Fail(message), () => Result.Fail("foo")
        ], 0);

        Expect(result).toEqual([ message ]);
    }

    @AsyncTest()
    @TestCase("foo", "bar")
    @TestCase("404 document not found", "500 error")
    public async shouldReturnAllErrorsIfNotSequential(firstMessage: string, secondMessage: string) {
        const result = await validate([
            () => Result.Fail(firstMessage), () => Result.Fail(secondMessage)
        ], 0, { sequential: false });

        Expect(result).toEqual([ firstMessage, secondMessage ]);
    }

    @AsyncTest()
    @TestCase("baz baz baz")
    @TestCase("ice cream and brie")
    public async shouldNotReturnErrorForPass(secondMessage: string) {
        const result = await validate([
            () => Result.Pass, () => Result.Fail(secondMessage)
        ], 0);

        Expect(result).toEqual([ secondMessage ]);
    }

    @AsyncTest()
    @TestCase(1)
    @TestCase(2)
    public async shouldCallFirstValidatorWithValue(value: number) {
        let calledCorrectly = false;
        const validator = (receivedValue: number) => {
            if (receivedValue === value) {
                calledCorrectly = true;
            }

            return Result.Pass;
        };

        await validate([
            validator, () => Result.Pass
        ], value);

        Expect(calledCorrectly).toBe(true);
    }

    @AsyncTest()
    @TestCase(1)
    @TestCase(2)
    public async shouldCallSecondValidatorWithValueIfFirstPasses(value: number) {
        let calledCorrectly = false;
        const validator = (receivedValue: number) => {
            if (receivedValue === value) {
                calledCorrectly = true;
            }

            return Result.Pass;
        };

        await validate([
            () => Result.Pass, validator
        ], value);

        Expect(calledCorrectly).toBe(true);
    }

    @AsyncTest()
    @Test()
    public async shouldStopAtFirstFail() {
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

        await validate([ firstValidator, secondValidator ], value);

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(false);
    }

    @AsyncTest()
    @Test()
    public async shouldNotStopAtFirstFailIfSequentialFalse() {
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

        await validate([ firstValidator, secondValidator ],
            value, { sequential: false });

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(true);
    }

    @AsyncTest()
    @Test()
    public async shouldNotCallSecondValidatorIfFirstStops() {
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

        await validate([ firstValidator, secondValidator ], value);

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(false);
    }

}
