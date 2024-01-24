import { print as origPrint } from "graphql";
import { canUseWeakMap } from "../common/canUse.js";
var printCache = canUseWeakMap ? new WeakMap() : undefined;
export var print = function (ast) {
    var result;
    result = printCache === null || printCache === void 0 ? void 0 : printCache.get(ast);
    if (!result) {
        result = origPrint(ast);
        printCache === null || printCache === void 0 ? void 0 : printCache.set(ast, result);
    }
    return result;
};
//# sourceMappingURL=print.js.map