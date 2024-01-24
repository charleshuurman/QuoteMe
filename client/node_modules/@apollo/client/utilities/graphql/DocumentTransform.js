import { Trie } from "@wry/trie";
import { canUseWeakMap, canUseWeakSet } from "../common/canUse.js";
import { checkDocument } from "./getFromAST.js";
import { invariant } from "../globals/index.js";
function identity(document) {
    return document;
}
var DocumentTransform = /** @class */ (function () {
    function DocumentTransform(transform, options) {
        if (options === void 0) { options = Object.create(null); }
        this.resultCache = canUseWeakSet ? new WeakSet() : new Set();
        this.transform = transform;
        if (options.getCacheKey) {
            // Override default `getCacheKey` function, which returns [document].
            this.getCacheKey = options.getCacheKey;
        }
        if (options.cache !== false) {
            this.stableCacheKeys = new Trie(canUseWeakMap, function (key) { return ({ key: key }); });
        }
    }
    // This default implementation of getCacheKey can be overridden by providing
    // options.getCacheKey to the DocumentTransform constructor. In general, a
    // getCacheKey function may either return an array of keys (often including
    // the document) to be used as a cache key, or undefined to indicate the
    // transform for this document should not be cached.
    DocumentTransform.prototype.getCacheKey = function (document) {
        return [document];
    };
    DocumentTransform.identity = function () {
        // No need to cache this transform since it just returns the document
        // unchanged. This should save a bit of memory that would otherwise be
        // needed to populate the `documentCache` of this transform.
        return new DocumentTransform(identity, { cache: false });
    };
    DocumentTransform.split = function (predicate, left, right) {
        if (right === void 0) { right = DocumentTransform.identity(); }
        return new DocumentTransform(function (document) {
            var documentTransform = predicate(document) ? left : right;
            return documentTransform.transformDocument(document);
        }, 
        // Reasonably assume both `left` and `right` transforms handle their own caching
        { cache: false });
    };
    DocumentTransform.prototype.transformDocument = function (document) {
        // If a user passes an already transformed result back to this function,
        // immediately return it.
        if (this.resultCache.has(document)) {
            return document;
        }
        var cacheEntry = this.getStableCacheEntry(document);
        if (cacheEntry && cacheEntry.value) {
            return cacheEntry.value;
        }
        checkDocument(document);
        var transformedDocument = this.transform(document);
        this.resultCache.add(transformedDocument);
        if (cacheEntry) {
            cacheEntry.value = transformedDocument;
        }
        return transformedDocument;
    };
    DocumentTransform.prototype.concat = function (otherTransform) {
        var _this = this;
        return new DocumentTransform(function (document) {
            return otherTransform.transformDocument(_this.transformDocument(document));
        }, 
        // Reasonably assume both transforms handle their own caching
        { cache: false });
    };
    DocumentTransform.prototype.getStableCacheEntry = function (document) {
        if (!this.stableCacheKeys)
            return;
        var cacheKeys = this.getCacheKey(document);
        if (cacheKeys) {
            invariant(Array.isArray(cacheKeys), 65);
            return this.stableCacheKeys.lookupArray(cacheKeys);
        }
    };
    return DocumentTransform;
}());
export { DocumentTransform };
//# sourceMappingURL=DocumentTransform.js.map