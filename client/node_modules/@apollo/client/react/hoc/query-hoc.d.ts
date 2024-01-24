import * as React from "react";
import type { DocumentNode } from "graphql";
import type { OperationOption, DataProps } from "./types.js";
export declare function withQuery<TProps extends TGraphQLVariables | Record<string, any> = Record<string, any>, TData extends object = {}, TGraphQLVariables extends object = {}, TChildProps extends object = DataProps<TData, TGraphQLVariables>>(document: DocumentNode, operationOptions?: OperationOption<TProps, TData, TGraphQLVariables, TChildProps>): (WrappedComponent: React.ComponentType<TProps & TChildProps>) => React.ComponentClass<TProps>;
//# sourceMappingURL=query-hoc.d.ts.map