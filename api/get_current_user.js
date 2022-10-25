var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(req.user))
})

module.exports = router
