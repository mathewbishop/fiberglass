var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authGuard = require('../core/auth-guard.js')

var authCheck = authGuard()

router.get('/', authCheck, function (req, res, next) {
  var content = ''

  content = template_render.get_template('dhcp6_log')
  content = template_render.set_template_variable(
    content,
    'title',
    'DHCPv6 Log'
  )
  content = template_render.set_template_variable(content, 'log_content', '')

  res.send(template_render.get_index_template(content, req.url))
})

module.exports = router
