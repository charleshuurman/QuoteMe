import * as React from "react";
import type { DocumentNode } from "graphql";
import type { DefaultContext, OperationVariables } from "../../core/types.js";
import type { OperationOption, MutateProps } from "./types.js";
import type { ApolloCache } from "../../core/index.js";
export declare function withMutation<TProps extends TGraphQLVariables | {} = {}, TData extends Record<string, any> = {}, TGraphQLVariables extends OperationVariables = {}, TChildProps = MutateProps<TData, TGraphQLVariables>, TContext extends Record<string, any> = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>>(document: DocumentNode, operationOptions?: OperationOption<TProps, TData, TGraphQLVariables, TChildProps>): (WrappedComponent: React.ComponentType<TProps & TChildProps>) => React.ComponentClass<TProps>;
//# sourceMappingURL=mutation-hoc.d.ts.map