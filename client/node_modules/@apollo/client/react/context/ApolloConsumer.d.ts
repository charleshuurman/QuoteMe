import * as React from "react";
import type { ApolloClient } from "../../core/index.js";
export interface ApolloConsumerProps {
    children: (client: ApolloClient<object>) => React.ReactChild | null;
}
export declare const ApolloConsumer: React.FC<ApolloConsumerProps>;
//# sourceMappingURL=ApolloConsumer.d.ts.map