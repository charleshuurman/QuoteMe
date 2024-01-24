import { __assign, __spreadArray } from "tslib";
import * as React from "react";
import { invariant } from "../../utilities/globals/index.js";
import { ApolloError, NetworkStatus } from "../../core/index.js";
import { isNonEmptyArray } from "../../utilities/index.js";
import { useApolloClient } from "./useApolloClient.js";
import { DocumentType, verifyDocumentType } from "../parser/index.js";
import { __use, useDeepMemo } from "./internal/index.js";
import { getSuspenseCache } from "../cache/index.js";
import { canonicalStringify } from "../../cache/index.js";
import { skipToken } from "./constants.js";
export function useSuspenseQuery(query, options) {
    if (options === void 0) { options = Object.create(null); }
    var client = useApolloClient(options.client);
    var suspenseCache = getSuspenseCache(client);
    var watchQueryOptions = useWatchQueryOptions({
        client: client,
        query: query,
        options: options,
    });
    var fetchPolicy = watchQueryOptions.fetchPolicy, variables = watchQueryOptions.variables;
    var _a = options.queryKey, queryKey = _a === void 0 ? [] : _a;
    var cacheKey = __spreadArray([
        query,
        canonicalStringify(variables)
    ], [].concat(queryKey), true);
    var queryRef = suspenseCache.getQueryRef(cacheKey, function () {
        return client.watchQuery(watchQueryOptions);
    });
    var _b = React.useState(function () { return new Map([[queryRef.key, queryRef.promise]]); }), promiseCache = _b[0], setPromiseCache = _b[1];
    var promise = promiseCache.get(queryRef.key);
    if (queryRef.didChangeOptions(watchQueryOptions)) {
        promise = queryRef.applyOptions(watchQueryOptions);
        promiseCache.set(queryRef.key, promise);
    }
    if (!promise) {
        promise = queryRef.promise;
        promiseCache.set(queryRef.key, promise);
    }
    React.useEffect(function () {
        var dispose = queryRef.retain();
        var removeListener = queryRef.listen(function (promise) {
            setPromiseCache(function (promiseCache) {
                return new Map(promiseCache).set(queryRef.key, promise);
            });
        });
        return function () {
            removeListener();
            dispose();
        };
    }, [queryRef]);
    var skipResult = React.useMemo(function () {
        var error = toApolloError(queryRef.result);
        return {
            loading: false,
            data: queryRef.result.data,
            networkStatus: error ? NetworkStatus.error : NetworkStatus.ready,
            error: error,
        };
    }, [queryRef.result]);
    var result = fetchPolicy === "standby" ? skipResult : __use(promise);
    var fetchMore = React.useCallback((function (options) {
        var promise = queryRef.fetchMore(options);
        setPromiseCache(function (previousPromiseCache) {
            return new Map(previousPromiseCache).set(queryRef.key, queryRef.promise);
        });
        return promise;
    }), [queryRef]);
    var refetch = React.useCallback(function (variables) {
        var promise = queryRef.refetch(variables);
        setPromiseCache(function (previousPromiseCache) {
            return new Map(previousPromiseCache).set(queryRef.key, queryRef.promise);
        });
        return promise;
    }, [queryRef]);
    var subscribeToMore = React.useCallback(function (options) { return queryRef.observable.subscribeToMore(options); }, [queryRef]);
    return React.useMemo(function () {
        return {
            client: client,
            data: result.data,
            error: toApolloError(result),
            networkStatus: result.networkStatus,
            fetchMore: fetchMore,
            refetch: refetch,
            subscribeToMore: subscribeToMore,
        };
    }, [client, fetchMore, refetch, result, subscribeToMore]);
}
function validateOptions(options) {
    var query = options.query, fetchPolicy = options.fetchPolicy, returnPartialData = options.returnPartialData;
    verifyDocumentType(query, DocumentType.Query);
    validateFetchPolicy(fetchPolicy);
    validatePartialDataReturn(fetchPolicy, returnPartialData);
}
function validateFetchPolicy(fetchPolicy) {
    if (fetchPolicy === void 0) { fetchPolicy = "cache-first"; }
    var supportedFetchPolicies = [
        "cache-first",
        "network-only",
        "no-cache",
        "cache-and-network",
    ];
    invariant(supportedFetchPolicies.includes(fetchPolicy), 56, fetchPolicy);
}
function validatePartialDataReturn(fetchPolicy, returnPartialData) {
    if (fetchPolicy === "no-cache" && returnPartialData) {
        globalThis.__DEV__ !== false && invariant.warn(57);
    }
}
export function toApolloError(result) {
    return isNonEmptyArray(result.errors) ?
        new ApolloError({ graphQLErrors: result.errors })
        : result.error;
}
export function useWatchQueryOptions(_a) {
    var client = _a.client, query = _a.query, options = _a.options;
    return useDeepMemo(function () {
        var _a;
        if (options === skipToken) {
            return { query: query, fetchPolicy: "standby" };
        }
        var fetchPolicy = options.fetchPolicy ||
            ((_a = client.defaultOptions.watchQuery) === null || _a === void 0 ? void 0 : _a.fetchPolicy) ||
            "cache-first";
        var watchQueryOptions = __assign(__assign({}, options), { fetchPolicy: fetchPolicy, query: query, notifyOnNetworkStatusChange: false, nextFetchPolicy: void 0 });
        if (globalThis.__DEV__ !== false) {
            validateOptions(watchQueryOptions);
        }
        // Assign the updated fetch policy after our validation since `standby` is
        // not a supported fetch policy on its own without the use of `skip`.
        if (options.skip) {
            watchQueryOptions.fetchPolicy = "standby";
        }
        return watchQueryOptions;
    }, [client, options, query]);
}
//# sourceMappingURL=useSuspenseQuery.js.map