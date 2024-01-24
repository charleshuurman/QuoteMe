/// <reference types="react" />
import * as PropTypes from "prop-types";
import type { OperationVariables } from "../../core/index.js";
import type { SubscriptionComponentOptions } from "./types.js";
export declare function Subscription<TData = any, TVariables extends OperationVariables = OperationVariables>(props: SubscriptionComponentOptions<TData, TVariables>): JSX.Element | null;
export declare namespace Subscription {
    var propTypes: PropTypes.InferProps<SubscriptionComponentOptions<any, any>>;
}
export interface Subscription<TData, TVariables extends OperationVariables> {
    propTypes: PropTypes.InferProps<SubscriptionComponentOptions<TData, TVariables>>;
}
//# sourceMappingURL=Subscription.d.ts.map