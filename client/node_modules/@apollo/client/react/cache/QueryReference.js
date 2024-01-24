import { __assign } from "tslib";
import { equal } from "@wry/equality";
import { isNetworkRequestSettled } from "../../core/index.js";
import { createFulfilledPromise, createRejectedPromise, } from "../../utilities/index.js";
var QUERY_REFERENCE_SYMBOL = Symbol();
export function wrapQueryRef(internalQueryRef) {
    var _a;
    return _a = {}, _a[QUERY_REFERENCE_SYMBOL] = internalQueryRef, _a;
}
export function unwrapQueryRef(queryRef) {
    return queryRef[QUERY_REFERENCE_SYMBOL];
}
var OBSERVED_CHANGED_OPTIONS = [
    "canonizeResults",
    "context",
    "errorPolicy",
    "fetchPolicy",
    "refetchWritePolicy",
    "returnPartialData",
];
var InternalQueryReference = /** @class */ (function () {
    function InternalQueryReference(observable, options) {
        var _this = this;
        this.listeners = new Set();
        this.status = "loading";
        this.references = 0;
        this.handleNext = this.handleNext.bind(this);
        this.handleError = this.handleError.bind(this);
        this.dispose = this.dispose.bind(this);
        this.observable = observable;
        // Don't save this result as last result to prevent delivery of last result
        // when first subscribing
        this.result = observable.getCurrentResult(false);
        this.key = options.key;
        if (options.onDispose) {
            this.onDispose = options.onDispose;
        }
        if (isNetworkRequestSettled(this.result.networkStatus) ||
            (this.result.data &&
                (!this.result.partial || this.watchQueryOptions.returnPartialData))) {
            this.promise = createFulfilledPromise(this.result);
            this.status = "idle";
        }
        else {
            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        }
        this.subscription = observable
            .filter(function (_a) {
            var data = _a.data;
            return !equal(data, {});
        })
            .subscribe({
            next: this.handleNext,
            error: this.handleError,
        });
        // Start a timer that will automatically dispose of the query if the
        // suspended resource does not use this queryRef in the given time. This
        // helps prevent memory leaks when a component has unmounted before the
        // query has finished loading.
        var startDisposeTimer = function () {
            var _a;
            if (!_this.references) {
                _this.autoDisposeTimeoutId = setTimeout(_this.dispose, (_a = options.autoDisposeTimeoutMs) !== null && _a !== void 0 ? _a : 30000);
            }
        };
        // We wait until the request has settled to ensure we don't dispose of the
        // query ref before the request finishes, otherwise we would leave the
        // promise in a pending state rendering the suspense boundary indefinitely.
        this.promise.then(startDisposeTimer, startDisposeTimer);
    }
    Object.defineProperty(InternalQueryReference.prototype, "watchQueryOptions", {
        get: function () {
            return this.observable.options;
        },
        enumerable: false,
        configurable: true
    });
    InternalQueryReference.prototype.retain = function () {
        var _this = this;
        this.references++;
        clearTimeout(this.autoDisposeTimeoutId);
        var disposed = false;
        return function () {
            if (disposed) {
                return;
            }
            disposed = true;
            _this.references--;
            // Wait before fully disposing in case the app is running in strict mode.
            setTimeout(function () {
                if (!_this.references) {
                    _this.dispose();
                }
            });
        };
    };
    InternalQueryReference.prototype.didChangeOptions = function (watchQueryOptions) {
        var _this = this;
        return OBSERVED_CHANGED_OPTIONS.some(function (option) {
            return !equal(_this.watchQueryOptions[option], watchQueryOptions[option]);
        });
    };
    InternalQueryReference.prototype.applyOptions = function (watchQueryOptions) {
        var _a = this.watchQueryOptions, currentFetchPolicy = _a.fetchPolicy, currentCanonizeResults = _a.canonizeResults;
        // "standby" is used when `skip` is set to `true`. Detect when we've
        // enabled the query (i.e. `skip` is `false`) to execute a network request.
        if (currentFetchPolicy === "standby" &&
            currentFetchPolicy !== watchQueryOptions.fetchPolicy) {
            this.initiateFetch(this.observable.reobserve(watchQueryOptions));
        }
        else {
            this.observable.silentSetOptions(watchQueryOptions);
            if (currentCanonizeResults !== watchQueryOptions.canonizeResults) {
                this.result = __assign(__assign({}, this.result), this.observable.getCurrentResult());
                this.promise = createFulfilledPromise(this.result);
            }
        }
        return this.promise;
    };
    InternalQueryReference.prototype.listen = function (listener) {
        var _this = this;
        this.listeners.add(listener);
        return function () {
            _this.listeners.delete(listener);
        };
    };
    InternalQueryReference.prototype.refetch = function (variables) {
        return this.initiateFetch(this.observable.refetch(variables));
    };
    InternalQueryReference.prototype.fetchMore = function (options) {
        return this.initiateFetch(this.observable.fetchMore(options));
    };
    InternalQueryReference.prototype.dispose = function () {
        this.subscription.unsubscribe();
        this.onDispose();
    };
    InternalQueryReference.prototype.onDispose = function () {
        // noop. overridable by options
    };
    InternalQueryReference.prototype.handleNext = function (result) {
        var _a;
        switch (this.status) {
            case "loading": {
                // Maintain the last successful `data` value if the next result does not
                // have one.
                if (result.data === void 0) {
                    result.data = this.result.data;
                }
                this.status = "idle";
                this.result = result;
                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, result);
                break;
            }
            case "idle": {
                // This occurs when switching to a result that is fully cached when this
                // class is instantiated. ObservableQuery will run reobserve when
                // subscribing, which delivers a result from the cache.
                if (result.data === this.result.data) {
                    return;
                }
                // Maintain the last successful `data` value if the next result does not
                // have one.
                if (result.data === void 0) {
                    result.data = this.result.data;
                }
                this.result = result;
                this.promise = createFulfilledPromise(result);
                this.deliver(this.promise);
                break;
            }
        }
    };
    InternalQueryReference.prototype.handleError = function (error) {
        var _a;
        this.subscription.unsubscribe();
        this.subscription = this.observable.resubscribeAfterError(this.handleNext, this.handleError);
        switch (this.status) {
            case "loading": {
                this.status = "idle";
                (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, error);
                break;
            }
            case "idle": {
                this.promise = createRejectedPromise(error);
                this.deliver(this.promise);
            }
        }
    };
    InternalQueryReference.prototype.deliver = function (promise) {
        this.listeners.forEach(function (listener) { return listener(promise); });
    };
    InternalQueryReference.prototype.initiateFetch = function (returnedPromise) {
        var _this = this;
        this.status = "loading";
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        this.promise.catch(function () { });
        // If the data returned from the fetch is deeply equal to the data already
        // in the cache, `handleNext` will not be triggered leaving the promise we
        // created in a pending state forever. To avoid this situtation, we attempt
        // to resolve the promise if `handleNext` hasn't been run to ensure the
        // promise is resolved correctly.
        returnedPromise
            .then(function (result) {
            var _a;
            if (_this.status === "loading") {
                _this.status = "idle";
                _this.result = result;
                (_a = _this.resolve) === null || _a === void 0 ? void 0 : _a.call(_this, result);
            }
        })
            .catch(function () { });
        return returnedPromise;
    };
    return InternalQueryReference;
}());
export { InternalQueryReference };
//# sourceMappingURL=QueryReference.js.map