import { __spreadArray } from "tslib";
import * as React from "react";
import { useApolloClient } from "./useApolloClient.js";
import { wrapQueryRef } from "../cache/QueryReference.js";
import { getSuspenseCache } from "../cache/index.js";
import { useWatchQueryOptions } from "./useSuspenseQuery.js";
import { canonicalStringify } from "../../cache/index.js";
export function useBackgroundQuery(query, options) {
    if (options === void 0) { options = Object.create(null); }
    var client = useApolloClient(options.client);
    var suspenseCache = getSuspenseCache(client);
    var watchQueryOptions = useWatchQueryOptions({ client: client, query: query, options: options });
    var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
    var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
    // This ref tracks the first time query execution is enabled to determine
    // whether to return a query ref or `undefined`. When initialized
    // in a skipped state (either via `skip: true` or `skipToken`) we return
    // `undefined` for the `queryRef` until the query has been enabled. Once
    // enabled, a query ref is always returned regardless of whether the query is
    // skipped again later.
    var didFetchResult = React.useRef(fetchPolicy !== "standby");
    didFetchResult.current || (didFetchResult.current = fetchPolicy !== "standby");
    var cacheKey = __spreadArray([
        query,
        canonicalStringify(variables)
    ], [].concat(queryKey), true);
    var queryRef = suspenseCache.getQueryRef(cacheKey, function () {
        return client.watchQuery(watchQueryOptions);
    });
    var _b = React.useState(function () { return new Map([[queryRef.key, queryRef.promise]]); }), promiseCache = _b[0], setPromiseCache = _b[1];
    if (queryRef.didChangeOptions(watchQueryOptions)) {
        var promise = queryRef.applyOptions(watchQueryOptions);
        promiseCache.set(queryRef.key, promise);
    }
    React.useEffect(function () { return queryRef.retain(); }, [queryRef]);
    var fetchMore = React.useCallback(function (options) {
        var promise = queryRef.fetchMore(options);
        setPromiseCache(function (promiseCache) {
            return new Map(promiseCache).set(queryRef.key, queryRef.promise);
        });
        return promise;
    }, [queryRef]);
    var refetch = React.useCallback(function (variables) {
        var promise = queryRef.refetch(variables);
        setPromiseCache(function (promiseCache) {
            return new Map(promiseCache).set(queryRef.key, queryRef.promise);
        });
        return promise;
    }, [queryRef]);
    queryRef.promiseCache = promiseCache;
    var wrappedQueryRef = React.useMemo(function () { return wrapQueryRef(queryRef); }, [queryRef]);
    return [
        didFetchResult.current ? wrappedQueryRef : void 0,
        { fetchMore: fetchMore, refetch: refetch },
    ];
}
//# sourceMappingURL=useBackgroundQuery.js.map