import { __awaiter, __extends, __generator } from "tslib";
import { ApolloLink } from "../core/index.js";
import { Observable } from "../../utilities/index.js";
import { buildDelayFunction } from "./delayFunction.js";
import { buildRetryFunction } from "./retryFunction.js";
/**
 * Tracking and management of operations that may be (or currently are) retried.
 */
var RetryableOperation = /** @class */ (function () {
    function RetryableOperation(operation, nextLink, delayFor, retryIf) {
        var _this = this;
        this.operation = operation;
        this.nextLink = nextLink;
        this.delayFor = delayFor;
        this.retryIf = retryIf;
        this.retryCount = 0;
        this.values = [];
        this.complete = false;
        this.canceled = false;
        this.observers = [];
        this.currentSubscription = null;
        this.onNext = function (value) {
            _this.values.push(value);
            for (var _i = 0, _a = _this.observers; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (!observer)
                    continue;
                observer.next(value);
            }
        };
        this.onComplete = function () {
            _this.complete = true;
            for (var _i = 0, _a = _this.observers; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (!observer)
                    continue;
                observer.complete();
            }
        };
        this.onError = function (error) { return __awaiter(_this, void 0, void 0, function () {
            var shouldRetry, _i, _a, observer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.retryCount += 1;
                        return [4 /*yield*/, this.retryIf(this.retryCount, this.operation, error)];
                    case 1:
                        shouldRetry = _b.sent();
                        if (shouldRetry) {
                            this.scheduleRetry(this.delayFor(this.retryCount, this.operation, error));
                            return [2 /*return*/];
                        }
                        this.error = error;
                        for (_i = 0, _a = this.observers; _i < _a.length; _i++) {
                            observer = _a[_i];
                            if (!observer)
                                continue;
                            observer.error(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    /**
     * Register a new observer for this operation.
     *
     * If the operation has previously emitted other events, they will be
     * immediately triggered for the observer.
     */
    RetryableOperation.prototype.subscribe = function (observer) {
        if (this.canceled) {
            throw new Error("Subscribing to a retryable link that was canceled is not supported");
        }
        this.observers.push(observer);
        // If we've already begun, catch this observer up.
        for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
            var value = _a[_i];
            observer.next(value);
        }
        if (this.complete) {
            observer.complete();
        }
        else if (this.error) {
            observer.error(this.error);
        }
    };
    /**
     * Remove a previously registered observer from this operation.
     *
     * If no observers remain, the operation will stop retrying, and unsubscribe
     * from its downstream link.
     */
    RetryableOperation.prototype.unsubscribe = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index < 0) {
            throw new Error("RetryLink BUG! Attempting to unsubscribe unknown observer!");
        }
        // Note that we are careful not to change the order of length of the array,
        // as we are often mid-iteration when calling this method.
        this.observers[index] = null;
        // If this is the last observer, we're done.
        if (this.observers.every(function (o) { return o === null; })) {
            this.cancel();
        }
    };
    /**
     * Start the initial request.
     */
    RetryableOperation.prototype.start = function () {
        if (this.currentSubscription)
            return; // Already started.
        this.try();
    };
    /**
     * Stop retrying for the operation, and cancel any in-progress requests.
     */
    RetryableOperation.prototype.cancel = function () {
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }
        clearTimeout(this.timerId);
        this.timerId = undefined;
        this.currentSubscription = null;
        this.canceled = true;
    };
    RetryableOperation.prototype.try = function () {
        this.currentSubscription = this.nextLink(this.operation).subscribe({
            next: this.onNext,
            error: this.onError,
            complete: this.onComplete,
        });
    };
    RetryableOperation.prototype.scheduleRetry = function (delay) {
        var _this = this;
        if (this.timerId) {
            throw new Error("RetryLink BUG! Encountered overlapping retries");
        }
        this.timerId = setTimeout(function () {
            _this.timerId = undefined;
            _this.try();
        }, delay);
    };
    return RetryableOperation;
}());
var RetryLink = /** @class */ (function (_super) {
    __extends(RetryLink, _super);
    function RetryLink(options) {
        var _this = _super.call(this) || this;
        var _a = options || {}, attempts = _a.attempts, delay = _a.delay;
        _this.delayFor =
            typeof delay === "function" ? delay : buildDelayFunction(delay);
        _this.retryIf =
            typeof attempts === "function" ? attempts : buildRetryFunction(attempts);
        return _this;
    }
    RetryLink.prototype.request = function (operation, nextLink) {
        var retryable = new RetryableOperation(operation, nextLink, this.delayFor, this.retryIf);
        retryable.start();
        return new Observable(function (observer) {
            retryable.subscribe(observer);
            return function () {
                retryable.unsubscribe(observer);
            };
        });
    };
    return RetryLink;
}(ApolloLink));
export { RetryLink };
//# sourceMappingURL=retryLink.js.map