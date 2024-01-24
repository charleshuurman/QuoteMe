import type { ApolloQueryResult, ObservableQuery, OperationVariables, WatchQueryOptions } from "../../core/index.js";
import type { CacheKey } from "./types.js";
type Listener<TData> = (promise: Promise<ApolloQueryResult<TData>>) => void;
type FetchMoreOptions<TData> = Parameters<ObservableQuery<TData>["fetchMore"]>[0];
declare const QUERY_REFERENCE_SYMBOL: unique symbol;
/**
 * A `QueryReference` is an opaque object returned by {@link useBackgroundQuery}.
 * A child component reading the `QueryReference` via {@link useReadQuery} will
 * suspend until the promise resolves.
 */
export interface QueryReference<TData = unknown> {
    [QUERY_REFERENCE_SYMBOL]: InternalQueryReference<TData>;
}
interface InternalQueryReferenceOptions {
    key: CacheKey;
    onDispose?: () => void;
    autoDisposeTimeoutMs?: number;
}
export declare function wrapQueryRef<TData>(internalQueryRef: InternalQueryReference<TData>): QueryReference<TData>;
export declare function unwrapQueryRef<TData>(queryRef: QueryReference<TData>): InternalQueryReference<TData>;
declare const OBSERVED_CHANGED_OPTIONS: readonly ["canonizeResults", "context", "errorPolicy", "fetchPolicy", "refetchWritePolicy", "returnPartialData"];
type ObservedOptions = Pick<WatchQueryOptions, (typeof OBSERVED_CHANGED_OPTIONS)[number]>;
export declare class InternalQueryReference<TData = unknown> {
    result: ApolloQueryResult<TData>;
    readonly key: CacheKey;
    readonly observable: ObservableQuery<TData>;
    promiseCache?: Map<CacheKey, Promise<ApolloQueryResult<TData>>>;
    promise: Promise<ApolloQueryResult<TData>>;
    private subscription;
    private listeners;
    private autoDisposeTimeoutId?;
    private status;
    private resolve;
    private reject;
    private references;
    constructor(observable: ObservableQuery<TData>, options: InternalQueryReferenceOptions);
    get watchQueryOptions(): WatchQueryOptions<OperationVariables, TData>;
    retain(): () => void;
    didChangeOptions(watchQueryOptions: ObservedOptions): boolean;
    applyOptions(watchQueryOptions: ObservedOptions): Promise<ApolloQueryResult<TData>>;
    listen(listener: Listener<TData>): () => void;
    refetch(variables: OperationVariables | undefined): Promise<ApolloQueryResult<TData>>;
    fetchMore(options: FetchMoreOptions<TData>): Promise<ApolloQueryResult<TData>>;
    private dispose;
    private onDispose;
    private handleNext;
    private handleError;
    private deliver;
    private initiateFetch;
}
export {};
//# sourceMappingURL=QueryReference.d.ts.map