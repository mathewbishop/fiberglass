var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var checkUserAuth = require('../core/checkUserAuth.js')

var checkUser = checkUserAuth()

function human_time(time) {
  var time = new Date(time)
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var date1 = time.getDate()
  var hour = time.getHours()
  var minutes = time.getMinutes()
  var seconds = time.getSeconds()

  return (
    year +
    '-' +
    month +
    '-' +
    date1 +
    ' ' +
    hour +
    ':' +
    minutes +
    ':' +
    seconds
  )
}

router.get('/', checkUser, function (req, res, next) {
  dhcp_leases = template_render.get_template('dhcp_leases')

  res.send(template_render.get_index_template(dhcp_leases, req.url))
})

module.exports = router
