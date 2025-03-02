"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDefaultDef = void 0;
const parseDef_1 = require("../parseDef.js");
function parseDefaultDef(_def, refs) {
    return {
        ...(0, parseDef_1.parseDef)(_def.innerType._def, refs),
        default: _def.defaultValue(),
    };
}
exports.parseDefaultDef = parseDefaultDef;
//# sourceMappingURL=default.js.map