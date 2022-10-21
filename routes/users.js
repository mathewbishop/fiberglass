var express = require('express')
var router = express.Router()
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn

var ensureLoggedIn = ensureLogIn()

/* GET users listing. */
router.get('/', ensureLoggedIn, function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
