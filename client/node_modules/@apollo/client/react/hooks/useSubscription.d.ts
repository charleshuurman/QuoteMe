import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { NoInfer, SubscriptionHookOptions, SubscriptionResult } from "../types/types.js";
import type { OperationVariables } from "../../core/index.js";
export declare function useSubscription<TData = any, TVariables extends OperationVariables = OperationVariables>(subscription: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: SubscriptionHookOptions<NoInfer<TData>, NoInfer<TVariables>>): SubscriptionResult<TData, TVariables>;
//# sourceMappingURL=useSubscription.d.ts.map