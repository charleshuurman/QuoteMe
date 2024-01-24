import * as React from "react";
import type { Render, BaseRender } from "./Render.js";
type ValidSnapshot = void | (object & {
    call?: never;
});
/** only used for passing around data internally */
declare const _stackTrace: unique symbol;
/** @internal */
export interface NextRenderOptions {
    timeout?: number;
    [_stackTrace]?: string;
}
/** @internal */
export interface ProfiledComponent<Props, Snapshot> extends React.FC<Props>, ProfiledComponentFields<Props, Snapshot>, ProfiledComponentOnlyFields<Props, Snapshot> {
}
interface ReplaceSnapshot<Snapshot> {
    (newSnapshot: Snapshot): void;
    (updateSnapshot: (lastSnapshot: Readonly<Snapshot>) => Snapshot): void;
}
interface MergeSnapshot<Snapshot> {
    (partialSnapshot: Partial<Snapshot>): void;
    (updatePartialSnapshot: (lastSnapshot: Readonly<Snapshot>) => Partial<Snapshot>): void;
}
interface ProfiledComponentOnlyFields<Props, Snapshot> {
    mergeSnapshot: MergeSnapshot<Snapshot>;
    replaceSnapshot: ReplaceSnapshot<Snapshot>;
}
interface ProfiledComponentFields<Props, Snapshot> {
    /**
     * An array of all renders that have happened so far.
     * Errors thrown during component render will be captured here, too.
     */
    renders: Array<Render<Snapshot> | {
        phase: "snapshotError";
        count: number;
        error: unknown;
    }>;
    /**
     * Peeks the next render from the current iterator position, without advancing the iterator.
     * If no render has happened yet, it will wait for the next render to happen.
     * @throws {WaitForRenderTimeoutError} if no render happens within the timeout
     */
    peekRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
    /**
     * Iterates to the next render and returns it.
     * If no render has happened yet, it will wait for the next render to happen.
     * @throws {WaitForRenderTimeoutError} if no render happens within the timeout
     */
    takeRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
    /**
     * Returns the total number of renders.
     */
    totalRenderCount(): number;
    /**
     * Returns the current render.
     * @throws {Error} if no render has happened yet
     */
    getCurrentRender(): Render<Snapshot>;
    /**
     * Waits for the next render to happen.
     * Does not advance the render iterator.
     */
    waitForNextRender(options?: NextRenderOptions): Promise<Render<Snapshot>>;
}
/** @internal */
export declare function profile<Snapshot extends ValidSnapshot = void, Props = Record<string, never>>({ Component, onRender, snapshotDOM, initialSnapshot, }: {
    Component: React.ComponentType<Props>;
    onRender?: (info: BaseRender & {
        snapshot: Snapshot;
        replaceSnapshot: ReplaceSnapshot<Snapshot>;
        mergeSnapshot: MergeSnapshot<Snapshot>;
    }) => void;
    snapshotDOM?: boolean;
    initialSnapshot?: Snapshot;
}): ProfiledComponent<Props, Snapshot>;
/** @internal */
export declare class WaitForRenderTimeoutError extends Error {
    constructor();
}
type StringReplaceRenderWithSnapshot<T extends string> = T extends `${infer Pre}Render${infer Post}` ? `${Pre}Snapshot${Post}` : T;
type ResultReplaceRenderWithSnapshot<T> = T extends (...args: infer Args) => Render<infer Snapshot> ? (...args: Args) => Snapshot : T extends (...args: infer Args) => Promise<Render<infer Snapshot>> ? (...args: Args) => Promise<Snapshot> : T;
type ProfiledHookFields<Props, ReturnValue> = ProfiledComponentFields<Props, ReturnValue> extends infer PC ? {
    [K in keyof PC as StringReplaceRenderWithSnapshot<K & string>]: ResultReplaceRenderWithSnapshot<PC[K]>;
} : never;
/** @internal */
export interface ProfiledHook<Props, ReturnValue> extends React.FC<Props>, ProfiledHookFields<Props, ReturnValue> {
    ProfiledComponent: ProfiledComponent<Props, ReturnValue>;
}
/** @internal */
export declare function profileHook<ReturnValue extends ValidSnapshot, Props>(renderCallback: (props: Props) => ReturnValue): ProfiledHook<Props, ReturnValue>;
export {};
//# sourceMappingURL=profile.d.ts.map