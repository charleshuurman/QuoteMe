import { ApolloLink } from "../core/index.js";
export declare const KEEP = "__KEEP";
interface KeepTypenameConfig {
    [key: string]: typeof KEEP | KeepTypenameConfig;
}
export interface RemoveTypenameFromVariablesOptions {
    except?: KeepTypenameConfig;
}
export declare function removeTypenameFromVariables(options?: RemoveTypenameFromVariablesOptions): ApolloLink;
export {};
//# sourceMappingURL=removeTypenameFromVariables.d.ts.map