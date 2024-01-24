import * as React from "react";
import { useSyncExternalStore } from "./useSyncExternalStore.js";
export function useReactiveVar(rv) {
    return useSyncExternalStore(React.useCallback(function (update) {
        // By reusing the same onNext function in the nested call to
        // rv.onNextChange(onNext), we can keep using the initial clean-up function
        // returned by rv.onNextChange(function onNext(v){...}), without having to
        // register the new clean-up function (returned by the nested
        // rv.onNextChange(onNext)) with yet another callback.
        return rv.onNextChange(function onNext() {
            update();
            rv.onNextChange(onNext);
        });
    }, [rv]), rv, rv);
}
//# sourceMappingURL=useReactiveVar.js.map