var express = require('express')
var router = express.Router()
var template_render = require('../core/render-template.js')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var crypto = require('crypto')
var db = require('../db')

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      function (err, row) {
        if (err) {
          return cb(err)
        }
        if (!row) {
          return cb(null, false, { message: 'Incorrect username or password.' })
        }

        crypto.pbkdf2(
          password,
          row.salt,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            if (err) {
              return cb(err)
            }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: 'Incorrect username or password.',
              })
            }
            return cb(null, row)
          }
        )
      }
    )
  })
)

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, authGroup: user.auth_group })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

router.get('/', function (req, res, next) {
  console.log(req.url)

  login = template_render.get_template('login')

  res.send(login)
})

router.post(
  '/',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })
)

module.exports = router
