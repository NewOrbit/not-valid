import { TestFixture, Test, TestCase, Expect } from "alsatian";
import { validate } from "../index";

@TestFixture()
export class ValidationTests {

    @Test()
    public shouldReturnEmptyArrayIfNoValidators() {
        const result = validate([], 0);

        Expect(result).toEqual([]);
    }

    @TestCase("an error occured")
    @TestCase("foo")
    public shouldReturnErrorMessageForOneError(message: string) {
        const result = validate([
            () => message
        ], 0);

        Expect(result).toEqual([ message ]);
    }

    @TestCase("foo", "baz baz baz")
    @TestCase("404 document not found", "ice cream and brie")
    public shouldReturnErrorMessageForTwoErrors(firstMessage: string, secondMessage: string) {
        const result = validate([
            () => firstMessage, () => secondMessage
        ], 0);

        Expect(result).toEqual([ firstMessage, secondMessage ]);
    }

    @TestCase("baz baz baz")
    @TestCase("ice cream and brie")
    public shouldNotReturnErrorMessageForValidatorWhichReturnsNull(secondMessage: string) {
        const result = validate([
            () => null, () => secondMessage
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

            return null;
        };

        validate([
            validator, () => null
        ], value);
    }

    @TestCase(1)
    @TestCase(2)
    public shouldCallSecondValidatorWithValue(value: number) {
        let calledCorrectly = false;
        const validator = (receivedValue: number) => {
            if (receivedValue === value) {
                calledCorrectly = true;
            }

            return null;
        };

        validate([
            () => null, validator
        ], value);
    }

    @Test()
    public shouldOnlyValidateFirstIfCalledWithSequentialOption() {
        const value = 5;
        
        let firstValidatorCalled = false;
        const firstValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                firstValidatorCalled = true;
            }

            return "return an error here";
        };

        let secondValidatorCalled = false;
        const secondValidator = (receivedValue: number) => {
            if (receivedValue === value) {
                secondValidatorCalled = true;
            }

            return null;
        };

        validate([ firstValidator, secondValidator ], 
            value, { sequential: true });

        Expect(firstValidatorCalled).toBe(true);
        Expect(secondValidatorCalled).toBe(false);
    }

    @Test()
    public shouldOnlyReturnFirstErrorIfCalledWithSequentialOption() {
        const firstMessage = "first message";
        const firstValidator = () => firstMessage;
        const secondValidator = () => "junk message";

        const errors = validate( [ firstValidator, secondValidator ],
            5, { sequential: true });

        Expect(errors).toEqual([ firstMessage ]);
    }

}
