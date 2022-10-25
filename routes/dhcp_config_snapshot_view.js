var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authGuard = require('../core/authGuard.js')

var authCheck = authGuard({ groupPermissionLevel: 'admin' })

router.post('/', authCheck, function (req, res, next) {
  var request = req.body
  res.send(fs.readFileSync('./config_backups/' + request.snapshot, 'utf8'))
})

module.exports = router
