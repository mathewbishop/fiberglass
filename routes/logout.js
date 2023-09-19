var express = require('express')
var router = express.Router()

router.post("/", function(req, res, next) {
    req.logOut(function(err) {
        if (err) return next(err)
        res.redirect("/login")
    })
})
  
module.exports = router