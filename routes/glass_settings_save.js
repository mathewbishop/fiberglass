/**
 * Created by cmiles on 8/9/2017.
 */

var express = require('express')
var router = express.Router()
var authGuard = require('../core/auth-guard.js')
var multer = require('multer')

var authCheck = authGuard({ groupPermissionLevel: 'admin' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}.${file.mimetype.split('/')[1]}`)
  },
})
var upload = multer({ storage: storage })

router.post(
  '/',
  authCheck,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
  ]),
  function (req, res, next) {
    var request = req.body
    var json_file = require('jsonfile')

    var glass_config = json_file.readFileSync('config/glass_config.json')

    glass_config.leases_file = request.leases_file
    glass_config.config_file = request.config_file
    glass_config.v6_config_file = request.v6_config_file
    glass_config.v4_pools_file = request.v4_pools_file
    glass_config.v6_pools_file = request.v6_pools_file
    glass_config.log_file = request.log_file
    glass_config.header_title = request.header_title
    glass_config.logo_background_color = request.logo_background_color

    // if a logo file was uploaded, set it
    if (req?.files?.logo) {
      glass_config.logo_file_path = `../../images/uploads/${req.files.logo[0].filename}`
    }

    // if a favicon file was uploaded, set it
    if (req?.files?.favicon) {
      glass_config.favicon_file_path = `images/uploads/${req.files.favicon[0].filename}`
    }

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
  }
)

module.exports = router
