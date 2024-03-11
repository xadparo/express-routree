import express, { Handler, Router } from 'express';
export type Kebabcase<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? Kebabcase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
type HandlerLike = Handler;
type ArrayBox<T> = Array<T> | T;
type MethodNames = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'connect' | 'trace';
type RoutreeExpressionObject = {
    use?: ArrayBox<HandlerLike>;
} & {
    [methodName in MethodNames]?: HandlerLike;
} & {
    [subPath: string]: RoutreeExpressionObject | {};
};
declare function routree(router: Router, tree: RoutreeExpressionObject): express.Router;
export default routree;
export { routree };
