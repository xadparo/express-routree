import express from 'express'

interface Tree {
  [key: string]: Leaf
}
type Leaf = Promise<Leaf> | Function | Array<any> | Tree

function DashCase(str: string) {
  return str.replace(/[A-Z]/g, sub => `-${sub.toLowerCase()}`)
}

function routree(router: any = express.Router(), tree: Tree) {
  var keys: string[] = Object.keys(tree)

  keys.forEach((key: string) => {
    var leaf: Leaf = tree[key]

    if(leaf instanceof Promise) {
      return leaf.then((thenleaf: Leaf) => {
        routree(router, { [key]: thenleaf })
      })
    } else if(leaf instanceof Function || leaf instanceof Array) {
      if(router[key] instanceof Function) {
        router[key]('/', ...(leaf instanceof Function? [leaf]: leaf))
      } else {
        throw new Error(`Not found key:"${key}" in router:${router}`)
      }
    } else {
      router.use('/' + DashCase(key), routree(express.Router(), leaf))
    }
  })

  return router
}

export default routree
