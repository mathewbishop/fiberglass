var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authGuard = require('../core/auth-guard.js')

var authCheck = authGuard()

router.get('/', authCheck, function (req, res, next) {
  var json_file = require('jsonfile')

  /* Read Config */
  glass_config = json_file.readFileSync('config/glass_config.json')

  var content = ''

  content = template_render.get_template('dhcp6_log')
  content = template_render.set_template_variable(
    content,
    'title',
    'DHCPv6 Log'
  )
  content = template_render.set_template_variable(content, 'log_content', '')
  content = template_render.set_template_variable(
    content,
    'log_file',
    glass_config.v6_log_file
  )

  res.send(template_render.get_index_template(content, req.url))
})

module.exports = router
