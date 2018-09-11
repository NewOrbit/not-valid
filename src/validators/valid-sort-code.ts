import { createRegexValidator } from "../create-regex-validator";
import { INVALID_SORT_CODE } from "../messages";

const SORT_CODE_REGEX = /^\d{6}$/;

export const validSortCode = createRegexValidator(SORT_CODE_REGEX, INVALID_SORT_CODE);
