import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { MutationHookOptions, MutationTuple, NoInfer } from "../types/types.js";
import type { ApolloCache, DefaultContext, OperationVariables } from "../../core/index.js";
export declare function useMutation<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>>(mutation: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: MutationHookOptions<NoInfer<TData>, NoInfer<TVariables>, TContext, TCache>): MutationTuple<TData, TVariables, TContext, TCache>;
//# sourceMappingURL=useMutation.d.ts.map