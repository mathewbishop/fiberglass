var express = require('express')
var router = express.Router()
var checkUserAuth = require('../core/checkUserAuth.js')

var checkUser = checkUserAuth({ groupPermissionLevel: 'admin' })

/* GET users listing. */
router.get('/', checkUser, function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
