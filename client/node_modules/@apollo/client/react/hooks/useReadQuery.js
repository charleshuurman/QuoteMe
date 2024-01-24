import * as React from "react";
import { unwrapQueryRef } from "../cache/QueryReference.js";
import { __use } from "./internal/index.js";
import { toApolloError } from "./useSuspenseQuery.js";
import { invariant } from "../../utilities/globals/index.js";
import { useSyncExternalStore } from "./useSyncExternalStore.js";
export function useReadQuery(queryRef) {
    var internalQueryRef = unwrapQueryRef(queryRef);
    invariant(internalQueryRef.promiseCache, 51);
    var promiseCache = internalQueryRef.promiseCache, key = internalQueryRef.key;
    if (!promiseCache.has(key)) {
        promiseCache.set(key, internalQueryRef.promise);
    }
    var promise = useSyncExternalStore(React.useCallback(function (forceUpdate) {
        return internalQueryRef.listen(function (promise) {
            internalQueryRef.promiseCache.set(internalQueryRef.key, promise);
            forceUpdate();
        });
    }, [internalQueryRef]), function () { return promiseCache.get(key); }, function () { return promiseCache.get(key); });
    var result = __use(promise);
    return React.useMemo(function () {
        return {
            data: result.data,
            networkStatus: result.networkStatus,
            error: toApolloError(result),
        };
    }, [result]);
}
//# sourceMappingURL=useReadQuery.js.map