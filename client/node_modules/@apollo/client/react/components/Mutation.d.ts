/// <reference types="react" />
import * as PropTypes from "prop-types";
import type { OperationVariables } from "../../core/index.js";
import type { MutationComponentOptions } from "./types.js";
export declare function Mutation<TData = any, TVariables = OperationVariables>(props: MutationComponentOptions<TData, TVariables>): JSX.Element | null;
export declare namespace Mutation {
    var propTypes: PropTypes.InferProps<MutationComponentOptions<any, any, import("../../core/types.js").DefaultContext, import("../../core/index.js").ApolloCache<any>>>;
}
export interface Mutation<TData, TVariables> {
    propTypes: PropTypes.InferProps<MutationComponentOptions<TData, TVariables>>;
}
//# sourceMappingURL=Mutation.d.ts.map