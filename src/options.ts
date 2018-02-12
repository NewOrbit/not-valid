interface ValidationOptions {
    sequential?: boolean;
}

const getDefaultIfUndefined = (val: any, defaultVal: any) => val === undefined ? defaultVal : val;

const DEFAULT_OPTIONS: ValidationOptions = {
    sequential: true
};

const getOptions = (options?: ValidationOptions) => {
    if (options === undefined) {
        return {
            sequential: DEFAULT_OPTIONS.sequential
        };
    }

    return {
        sequential: getDefaultIfUndefined(options.sequential, DEFAULT_OPTIONS.sequential)
    };
};

export {
    ValidationOptions,
    getOptions
};
