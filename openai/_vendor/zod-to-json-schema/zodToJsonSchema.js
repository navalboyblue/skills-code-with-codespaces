"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodToJsonSchema = void 0;
const parseDef_1 = require("./parseDef.js");
const Refs_1 = require("./Refs.js");
const zodToJsonSchema = (schema, options) => {
    const refs = (0, Refs_1.getRefs)(options);
    const definitions = typeof options === 'object' && options.definitions ?
        Object.entries(options.definitions).reduce((acc, [name, schema]) => ({
            ...acc,
            [name]: (0, parseDef_1.parseDef)(schema._def, {
                ...refs,
                currentPath: [...refs.basePath, refs.definitionPath, name],
            }, true) ?? {},
        }), {})
        : undefined;
    const name = typeof options === 'string' ? options
        : options?.nameStrategy === 'title' ? undefined
            : options?.name;
    const main = (0, parseDef_1.parseDef)(schema._def, name === undefined ? refs : ({
        ...refs,
        currentPath: [...refs.basePath, refs.definitionPath, name],
    }), false) ?? {};
    const title = typeof options === 'object' && options.name !== undefined && options.nameStrategy === 'title' ?
        options.name
        : undefined;
    if (title !== undefined) {
        main.title = title;
    }
    const rootRefPath = name ? [...refs.basePath, refs.definitionPath, name].join('/') : null;
    const combined = name === undefined ?
        definitions ?
            {
                ...main,
                [refs.definitionPath]: definitions,
            }
            : main
        : refs.nameStrategy === 'duplicate-ref' ?
            {
                ...main,
                ...(definitions || refs.seenRefs.has(rootRefPath) ?
                    {
                        [refs.definitionPath]: {
                            ...definitions,
                            // only actually duplicate the schema definition if it was ever referenced
                            // otherwise the duplication is completely pointless
                            ...(refs.seenRefs.has(rootRefPath) ? { [name]: main } : undefined),
                        },
                    }
                    : undefined),
            }
            : {
                $ref: [...(refs.$refStrategy === 'relative' ? [] : refs.basePath), refs.definitionPath, name].join('/'),
                [refs.definitionPath]: {
                    ...definitions,
                    [name]: main,
                },
            };
    if (refs.target === 'jsonSchema7') {
        combined.$schema = 'http://json-schema.org/draft-07/schema#';
    }
    else if (refs.target === 'jsonSchema2019-09') {
        combined.$schema = 'https://json-schema.org/draft/2019-09/schema#';
    }
    return combined;
};
exports.zodToJsonSchema = zodToJsonSchema;
//# sourceMappingURL=zodToJsonSchema.js.map