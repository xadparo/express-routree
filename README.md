# How to use?
``` javascript
var express = require('express')
  , routree = require('routree')
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
