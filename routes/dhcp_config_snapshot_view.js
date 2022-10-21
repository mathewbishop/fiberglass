var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authorize = require('../core/authorize.js')
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn

var ensureLoggedIn = ensureLogIn()

router.post('/', ensureLoggedIn, authorize.auth, function (req, res, next) {
  var request = req.body
  res.send(fs.readFileSync('./config_backups/' + request.snapshot, 'utf8'))
})

module.exports = router
