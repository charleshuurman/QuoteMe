import type { DocumentNode } from "graphql";
export type DocumentTransformCacheKey = ReadonlyArray<unknown>;
type TransformFn = (document: DocumentNode) => DocumentNode;
interface DocumentTransformOptions {
    cache?: boolean;
    getCacheKey?: (document: DocumentNode) => DocumentTransformCacheKey | undefined;
}
export declare class DocumentTransform {
    private readonly transform;
    private readonly resultCache;
    private stableCacheKeys;
    private getCacheKey;
    static identity(): DocumentTransform;
    static split(predicate: (document: DocumentNode) => boolean, left: DocumentTransform, right?: DocumentTransform): DocumentTransform;
    constructor(transform: TransformFn, options?: DocumentTransformOptions);
    transformDocument(document: DocumentNode): DocumentNode;
    concat(otherTransform: DocumentTransform): DocumentTransform;
    getStableCacheEntry(document: DocumentNode): {
        key: DocumentTransformCacheKey;
        value?: DocumentNode | undefined;
    } | undefined;
}
export {};
//# sourceMappingURL=DocumentTransform.d.ts.map