import { TestFixture, Test, TestCase, Expect, SpyOn, FocusTests } from "alsatian";
import { Result } from "../src/index";
import { createValidatorFactory } from "../src/create-validator-factory";

@FocusTests
@TestFixture()
export class CreateValidatorFactoryTests {

    @TestCase((x: number) => x === 0)
    @TestCase((y: number) => y === y * 2)
    public shouldUseCorrectPredicate(predicate: () => boolean) {
        const spyWrapper = {
            predicate: predicate
        };

        SpyOn(spyWrapper, "predicate");

        const factory = createValidatorFactory(predicate);
        const input = 0;

        factory("some message")(input);

        Expect(spyWrapper.predicate).toHaveBeenCalledWith(input);
    }

    /*
    @TestCase((s: number) => s !== 1, 1, false)
    @TestCase((s: number) => s !== 1, 2, true)
    @TestCase((s: string) => s.length === 3, "foo", true)
    @TestCase((s: string) => s.indexOf("james") !== -1, "I am bob", false)
    public shouldUseCorrectPredicate(predicate: (val: any) => boolean, input: any, shouldPass: boolean) {
        const message = "failed";
        const validator = createValidator<any>(predicate, message);

        const expectedResult = shouldPass ? Result.Pass : Result.Fail(message);

        const result = validator(input);

        Expect(result).toEqual(expectedResult);
    }

    @TestCase("it aint no good yo")
    @TestCase("FAILURE FAILURE 0x100")
    public shouldUseCorrectMessage(message: string) {
        const validator = createValidator<number>((s: number) => s !== 5, message);

        // make validation fail
        const result = validator(5);

        Expect(result).toEqual(Result.Fail(message));
    }
    */
}
