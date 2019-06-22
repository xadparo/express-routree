var express = require('express')
  , Router = express.Router
  , { entries } = Object

function ToLikePromise(toLikePromise) {
  if(toLikePromise instanceof Promise) {
    return toLikePromise
  } else return new Promise(function(resolve, reject) {
    resolve(toLikePromise)
  })
}

function toDashCase(camelString) {
  return camelString.replace(/[A-Z]/g, big => `-${big.toLowerCase()}`)
}

function routree(router, tree = {}) {
  entries(tree).forEach(([prop, originLeaf]) => {
    var leafProm = ToLikePromise(originLeaf)

    leafProm.then(leaf => {
      if(leaf instanceof Function) {
        router[prop]('/', leaf)
      } else  if(typeof leaf === 'object') {
        router.use(`/${toDashCase(prop)}`, routree(Router(), leaf))
      }
    })
  })
  return router
}

module.exports = routree
