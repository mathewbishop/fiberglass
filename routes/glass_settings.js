/**
 * Created by cmiles on 8/9/2017.
 */

var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authGuard = require('../core/auth-guard.js')

var authCheck = authGuard({ groupPermissionLevel: 'admin' })

router.get('/', authCheck, function (req, res, next) {
  glass_settings_template = template_render.get_template('glass_settings')

  var json_file = require('jsonfile')

  /* Read Config */
  glass_config = json_file.readFileSync('config/glass_config.json')

  /* Leases File */
  input = template_render.form_input(
    'Leases File',
    '<input type="input" class="form-control" id="leases_file" placeholder="/var/lib/dhcp/dhcpd.leases" value="' +
      glass_config.leases_file +
      '">'
  )

  /* Main Config File */
  input =
    input +
    template_render.form_input(
      'Main Config File',
      '<input type="input" class="form-control" id="config_file" placeholder="/etc/dhcp/dhcpd.conf" value="' +
        glass_config.config_file +
        '">'
    )

  /* v4 Pools Config File */
  input =
    input +
    template_render.form_input(
      'v4 Pools Config File',
      '<input type="input" class="form-control" id="v4_config_file" placeholder="/etc/dhcp/dhcp.d/dhcp4.nets" value="' +
        glass_config.v4_config_file +
        '">'
    )

  /* v6 Pools Config File */
  input =
    input +
    template_render.form_input(
      'v6 Pools Config File',
      '<input type="input" class="form-control" id="v6_config_file" placeholder="/etc/dhcp/dhcp.d/dhcp6.nets" value="' +
        glass_config.v6_config_file +
        '">'
    )

  /* Log File */
  input =
    input +
    template_render.form_input(
      'Log File',
      '<input type="input" class="form-control" id="log_file" placeholder="/var/log/dhcp.log" value="' +
        glass_config.log_file +
        '">'
    )

  /* Header Title */
  input =
    input +
    template_render.form_input(
      'Header Title (requires application restart)',
      '<input type="input" class="form-control" id="header_title" placeholder="ISC DHCP Server Interface" value="' +
        glass_config.header_title +
        '">'
    )

  /* Logo File */
  input =
    input +
    template_render.form_input(
      'Logo File',
      '<input type="input" class="form-control" id="logo_file" placeholder="/path/to/file" value="' +
        glass_config.logo_file +
        '">'
    )

  /* Logo Background Color */
  input =
    input +
    template_render.form_input(
      'Logo Background Color (hex, keyword, etc)',
      '<input type="input" class="form-control" id="logo_background_color" placeholder="blue, #e88121, etc" value="' +
        glass_config.logo_background_color +
        '">'
    )

  input =
    input +
    '<br><button type="button" class="btn btn-info waves-effect" onclick="save_config()"><i class="material-icons">settings</i> <span>Save Config</span></button>'
  input = input + '<br><div id="glass_settings_result"></div>'

  form_data = template_render.form_body('glass-settings-form', input)

  glass_settings_template = template_render.set_template_variable(
    glass_settings_template,
    'body_content',
    form_data
  )

  res.send(template_render.get_index_template(glass_settings_template, req.url))
})

module.exports = router
