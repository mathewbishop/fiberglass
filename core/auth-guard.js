// (The MIT License)

// Copyright (c) 2012-2013 Jared Hanson
// Copyright (c) 2022 Matt Bishop

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//==========================================
// Attribution Notice
//==========================================
// This program is heavily derived from a function written by Jared Hanson (see License above), as part of an npm package called "connect-ensure-login" (https://www.npmjs.com/package/connect-ensure-login)

/**
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 */

module.exports = function authGuard(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {}

  var url = options.redirectTo || '/login'
  var setReturnTo =
    options.setReturnTo === undefined ? true : options.setReturnTo

  var groupPermissionLevel = options.groupPermissionLevel || false

  return function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect(url)
    }

    // check user permissions
    switch (groupPermissionLevel) {
      case 'admin':
        if (req.user.authGroup !== 'admin')
          return res.status(403).send('Unauthorized')
      case 'operator':
        if (req.user.authGroup !== 'admin' && req.user.authGroup !== 'operator')
          return res.status(403).send('Unauthorized')
      default:
        next()
    }
  }
}
