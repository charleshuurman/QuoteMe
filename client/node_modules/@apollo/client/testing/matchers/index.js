import { expect } from "@jest/globals";
import { toMatchDocument } from "./toMatchDocument.js";
import { toHaveSuspenseCacheEntryUsing } from "./toHaveSuspenseCacheEntryUsing.js";
import { toRerender, toRenderExactlyTimes } from "./ProfiledComponent.js";
expect.extend({
    toHaveSuspenseCacheEntryUsing: toHaveSuspenseCacheEntryUsing,
    toMatchDocument: toMatchDocument,
    toRerender: toRerender,
    toRenderExactlyTimes: toRenderExactlyTimes,
});
//# sourceMappingURL=index.js.map