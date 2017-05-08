import { TestFixture, Test, TestCase, Expect } from "alsatian";
import { validate } from "./index";

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

}