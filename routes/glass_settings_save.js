/**
 * Created by cmiles on 8/9/2017.
 */

var express = require('express')
var router = express.Router()
var authGuard = require('../core/authGuard.js')

var authCheck = authGuard({ groupPermissionLevel: 'admin' })

router.post('/', authCheck, function (req, res, next) {
  var request = req.body
  var json_file = require('jsonfile')

  var glass_config = json_file.readFileSync('config/glass_config.json')

  glass_config.leases_file = request.leases_file
  glass_config.log_file = request.log_file
  glass_config.config_file = request.config_file

  json_file.writeFile(
    './config/glass_config.json',
    glass_config,
    { spaces: 2 },
    function (err) {
      console.error(err)
    }
  )

  res.send(
    '<script type="text/javascript">notification(\'Saved Config!\')</script>'
  )
})

module.exports = router
