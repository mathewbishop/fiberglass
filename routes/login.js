var express = require('express')
var router = express.Router()
var template_render = require('../core/render-template.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.url)

  login = template_render.get_template('login')

  res.send(login)
})

module.exports = router
