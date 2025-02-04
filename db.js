var sqlite3 = require('sqlite3')
var crypto = require('crypto')
var path = require('path')

var db = new sqlite3.Database(path.join(__dirname, '.db/glass.db'))

db.serialize(function () {
  // create the database schema for the todos app
  db.run(
    'CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    auth_group TEXT, \
    hashed_password BLOB, \
    salt BLOB \
  )'
  )

  // create an initial user (username: admin, password: admin)
  var salt = crypto.randomBytes(16)
  db.run(
    'INSERT OR IGNORE INTO users (username, auth_group, hashed_password, salt) VALUES (?, ?, ?, ?)',
    ['admin', 'admin', crypto.pbkdf2Sync('admin', salt, 310000, 32, 'sha256'), salt]
  )
})

module.exports = db
