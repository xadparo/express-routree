# How to use?

express-routree는 express용 미들웨어로써, express.Router와 Tree<URL/Method, ChildTree/Handler>를 받아 Tree의 정보를 Router에 바인딩 합니다.  
Router의 method로써 존재한다면 무엇이든 사용될 수 있습니다.  
**ex) router.get, router.post, router.use**

``` javascript
var express = require('express')
  , routree = require('express-routree')
  , app = express()
  , defaultRouter = express.Router()

routree(defaultRouter, {
  // http://host/howareyou => Imfineandyou
  howareyou: {
    get(rq, rs) {
      rs.end(`Imfineandyou`)
    },
  },
  // http://host/how-are-you => I'm fine. and you?
  howAreYou: {
    get(rq, rs) {
      rs.end(`I'm fine. and you?`)
    },
  },
  // http://host/how/are/you => I/m/fine/and/you?
  how: {
    are: {
      you: {
        get(rq, rs) {
          rs.end(`I/m/fine/and/you?`)
        },
      },
    },
  },
})

app.use('/', defaultRouter)
app.listen(80)
```
