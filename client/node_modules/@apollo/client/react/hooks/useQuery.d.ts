import type { OperationVariables, WatchQueryFetchPolicy } from "../../core/index.js";
import type { ApolloClient, ApolloQueryResult, DocumentNode, TypedDocumentNode } from "../../core/index.js";
import type { QueryHookOptions, QueryResult, NoInfer } from "../types/types.js";
import { useApolloClient } from "./useApolloClient.js";
export declare function useQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>): QueryResult<TData, TVariables>;
export declare function useInternalState<TData, TVariables extends OperationVariables>(client: ApolloClient<any>, query: DocumentNode | TypedDocumentNode<TData, TVariables>): InternalState<TData, TVariables>;
declare class InternalState<TData, TVariables extends OperationVariables> {
    readonly client: ReturnType<typeof useApolloClient>;
    readonly query: DocumentNode | TypedDocumentNode<TData, TVariables>;
    constructor(client: ReturnType<typeof useApolloClient>, query: DocumentNode | TypedDocumentNode<TData, TVariables>, previous?: InternalState<TData, TVariables>);
    /**
     * Forces an update using local component state.
     * As this is not batched with `useSyncExternalStore` updates,
     * this is only used as a fallback if the `useSyncExternalStore` "force update"
     * method is not registered at the moment.
     * See https://github.com/facebook/react/issues/25191
     *  */
    forceUpdateState(): void;
    /**
     * Will be overwritten by the `useSyncExternalStore` "force update" method
     * whenever it is available and reset to `forceUpdateState` when it isn't.
     */
    forceUpdate: () => void;
    executeQuery(options: QueryHookOptions<TData, TVariables> & {
        query?: DocumentNode;
    }): Promise<QueryResult<TData, TVariables>>;
    useQuery(options: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables>;
    private renderPromises;
    private queryHookOptions;
    private watchQueryOptions;
    private useOptions;
    private getObsQueryOptions;
    private ssrDisabledResult;
    private skipStandbyResult;
    private createWatchQueryOptions;
    getDefaultFetchPolicy(): WatchQueryFetchPolicy;
    private onCompleted;
    private onError;
    private observable;
    private obsQueryFields;
    private useObservableQuery;
    private result;
    private previousData;
    private setResult;
    private handleErrorOrCompleted;
    private toApolloError;
    private getCurrentResult;
    private toQueryResultCache;
    toQueryResult(result: ApolloQueryResult<TData>): QueryResult<TData, TVariables>;
    private unsafeHandlePartialRefetch;
}
export {};
//# sourceMappingURL=useQuery.d.ts.map