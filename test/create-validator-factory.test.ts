import { TestFixture, Test, TestCase, SpyOn, AsyncTest } from "alsatian";
import { Expect } from "./utils/alsatian";
import { Result } from "../src/index";
import { createValidatorFactory, createAsyncValidatorFactory } from "../src/create-validator-factory";

@TestFixture()
export class CreateValidatorFactoryTests {

    @TestCase((x: number) => x === 0)
    @TestCase((y: number) => y === y * 2)
    public shouldUseCorrectPredicate(predicate: () => boolean) {
        const spyWrapper = {
            predicate: predicate
        };

        SpyOn(spyWrapper, "predicate");

        const factory = createValidatorFactory(spyWrapper.predicate);
        const validator = factory("some message");
        
        const input = 0;
        validator(input);

        Expect(spyWrapper.predicate).toHaveBeenCalledWith(input);
    }

    @TestCase("message one")
    @TestCase("another message")
    public shouldFailWithCorrectMessage(message: string) {
        const factory = createValidatorFactory(() => false); // create a validator that always fails
        const validator = factory(message);

        const result = validator(0); // call the validator with anything - it always fails

        Expect(result).toEqual(Result.Fail(message));
    }

}

@TestFixture()
export class CreateAsyncValidatorFactoryTests {

    @AsyncTest()
    @TestCase(async (x: number) => x === 0)
    @TestCase(async (y: number) => y === y * 2)
    public async shouldUseCorrectPredicate(predicate: () => Promise<boolean>) {
        const spyWrapper = {
            predicate: predicate
        };

        SpyOn(spyWrapper, "predicate");

        const factory = createAsyncValidatorFactory(spyWrapper.predicate);
        const validator = factory("some message");
        
        const input = 0;
        await validator(input);

        Expect(spyWrapper.predicate).toHaveBeenCalledWith(input);
    }

    @AsyncTest()
    @TestCase("message one")
    @TestCase("another message")
    public async shouldFailWithCorrectMessage(message: string) {
        const factory = createAsyncValidatorFactory(async () => false); // create a validator that always fails
        const validator = factory(message);

        const result = await validator(0); // call the validator with anything - it always fails

        Expect(result).toEqual(Result.Fail(message));
    }

}
