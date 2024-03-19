var express = require('express')
var router = express.Router()
var fs = require('fs')
var template_render = require('../core/render-template.js')
var authGuard = require('../core/auth-guard.js')

var authCheck = authGuard()

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

router.post('/', authCheck, function (req, res, next) {
  var request = req.body
  var search = request.search

  dhcp6_leases = template_render.get_template('dhcp6_lease_search')

  table_data = ''

  var count = 0
  for (var key in v6_dhcp_lease_data) {
    var matcher = new RegExp(search, 'i')

    // console.log(dhcp_lease_data[key]);

    // if (
    //   !matcher.test(dhcp_lease_data[key].mac_oui_vendor) &&
    //   !matcher.test(dhcp_lease_data[key].host) &&
    //   !matcher.test(key) &&
    //   !matcher.test(JSON.stringify(dhcp_lease_data[key])) &&
    //   !matcher.test(dhcp_lease_data[key].mac) &&
    //   !matcher.test(JSON.stringify(dhcp_lease_data[key].options, null, 2))
    // )
    //   continue

    table_row = ''
    table_row = table_row + '<td>' + key + '</td>'
    table_row =
      table_row + '<td>' + human_time(v6_dhcp_lease_data[key]?.cltt) + '</td>'
    table_row =
      table_row + '<td>' + v6_dhcp_lease_data[key]?.bindingState + '</td>'
    table_row =
      table_row + '<td>' + v6_dhcp_lease_data[key]?.preferredLife + '</td>'
    table_row = table_row + '<td>' + v6_dhcp_lease_data[key]?.maxLife + '</td>'
    table_row =
      table_row +
      '<td>' +
      human_time(v6_dhcp_lease_data[key]?.end * 1000) +
      '</td>'
    if (typeof v6_dhcp_lease_data[key]?.mac !== 'undefined') {
      table_row =
        table_row +
        '<td>' +
        '<button class="btn btn-default waves-effect option_data" lease="' +
        v6_dhcp_lease_data[key].mac.split(':').join('') +
        '">Show</button>' +
        '<pre style="display:none;margin-top:10px" id="' +
        v6_dhcp_lease_data[key].mac.split(':').join('') +
        '">' +
        JSON.stringify(v6_dhcp_lease_data[key].options, null, 2) +
        '</pre>' +
        '</td>'
    } else {
      table_row = table_row + '<td></td>'
    }
    table_data = table_data + '<tr>' + table_row + '</tr>'

    count++

    if (count >= 10000) {
      break
    }
  }

  table_data = template_render.set_template_variable(
    dhcp6_leases,
    'table_data',
    table_data
  )

  res.send(table_data)
})

module.exports = router
