import express, { Handler, Router } from 'express'

export type Kebabcase<T extends string, A extends string = ""> =
	T extends `${infer F}${infer R}`
		? Kebabcase<R, `${A}${F extends Lowercase<F>? "": "-"}${Lowercase<F>}`>
		: A

function convertKebabCase<T extends string>(str: T): Kebabcase<T> {
	return str.replaceAll(/[A-Z]/g, sub => `-${sub.toLowerCase()}`) as Kebabcase<T>
}

type HandlerLike = Handler
type ArrayBox<T> = Array<T> | T
type MethodNames = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'connect' | 'trace'
const methodNames = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'connect', 'trace'] as const
const methodNameMap: Partial<Record<MethodNames, boolean>> = {}
for(const methodName of methodNames) {
	methodNameMap[methodName] = true
}

type RoutreeExpressionObject =  {
	use?: ArrayBox<HandlerLike>
} & {
	[methodName in MethodNames]?: HandlerLike
} & {
	[subPath: string]: RoutreeExpressionObject | {}
}

function routree(router: Router, tree: RoutreeExpressionObject) {
	for(let key in tree) {
		if((key === 'use') && (tree.use)) { // binging use handler(s)
			const useHandlers = Array.isArray(tree.use)? tree.use: [tree.use]
			useHandlers.forEach(handler => {
				router.use(handler)
			})
		} else if((key in methodNameMap) && (tree[key])) { // binging method handler
			const methodName = key as MethodNames
			console.log('bind', methodName, key)
			router[methodName]('/', tree[methodName] as Handler)
		} else {
			router.use('/' + convertKebabCase(key), routree(express.Router(), tree[key]))
		}
	}

	return router
}

export default routree
export { routree }
