/// <reference types="react" />
import type { DocumentNode } from "graphql";
import type { OperationOption, DataProps, MutateProps } from "./types.js";
import type { OperationVariables } from "../../core/index.js";
export declare function graphql<TProps extends TGraphQLVariables | {} = {}, TData extends object = {}, TGraphQLVariables extends OperationVariables = {}, TChildProps extends object = Partial<DataProps<TData, TGraphQLVariables>> & Partial<MutateProps<TData, TGraphQLVariables>>>(document: DocumentNode, operationOptions?: OperationOption<TProps, TData, TGraphQLVariables, TChildProps>): (WrappedComponent: React.ComponentType<TProps & TChildProps>) => React.ComponentClass<TProps>;
//# sourceMappingURL=graphql.d.ts.map