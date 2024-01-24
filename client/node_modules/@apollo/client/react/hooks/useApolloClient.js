import { invariant } from "../../utilities/globals/index.js";
import * as React from "react";
import { getApolloContext } from "../context/index.js";
export function useApolloClient(override) {
    var context = React.useContext(getApolloContext());
    var client = override || context.client;
    invariant(!!client, 49);
    return client;
}
//# sourceMappingURL=useApolloClient.js.map