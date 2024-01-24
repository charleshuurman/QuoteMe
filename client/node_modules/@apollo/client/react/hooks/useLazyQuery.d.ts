import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { OperationVariables } from "../../core/index.js";
import type { LazyQueryHookOptions, LazyQueryResultTuple, NoInfer } from "../types/types.js";
export declare function useLazyQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: LazyQueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>): LazyQueryResultTuple<TData, TVariables>;
//# sourceMappingURL=useLazyQuery.d.ts.map