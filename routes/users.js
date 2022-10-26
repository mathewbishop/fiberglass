var express = require('express')
var router = express.Router()
var authGuard = require('../core/auth-guard.js')

var authCheck = authGuard({ groupPermissionLevel: 'admin' })

/* GET users listing. */
router.get('/', authCheck, function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
