![fiberglass logo](./public/images/fiberglass_logo4_with_text_transparent1.png)

`FiberGlass` is a fork of Chris Miles' (chris.miles.e@gmail.com) Glass (glass-isc-dhcp) web UI for ISC DHCP that includes user authentication, user group authorization, additional configuration options and changes, and more.

# Overview

- Local user auth
- Passport.js and SQLite (DB in app directory)
- User group authorization: give users access based on groups
- If you've broken out separate IPv4 and IPv6 config files and added them as includes into the main dhcp.conf, edit them in this UI as well
- Updated menu based on user groups
- Change some UI style settings through the admin UI

# Getting started

### Pre-reqs:

- `isc-dhcp-server` is installed installed => `apt install isc-dhcp-server`

### To install and use `FiberGlass`:

**1. Follow the normal install instructions and process outlined in the local [README](./README.original.glass.md#installation), but clone _this_ repo instead of the orignial**

**2. Install package `sqlite3` on the local system: `apt install sqlite3`**

**3. Create a file named `.env` at the root of this directory (the application directory)**

- add the following entry in the file `SESSION_COOKIE_SECRET=`
- add a session cookie secret after the equals sign; it can/should be any randomly generated long string, 20 or more characters recommended.

**4. Create your `glass_config.json` file**

Inside the `config` directory is a file named `glass_config.example.json` with a default config. Copy this file and rename it to `glass_config.json` for use in the app.

`cp config/glass_config.example.json config/glass_config.json`

# Attribution/Credit

**Chris Miles' (chris.miles.e@gmail.com)**

Author of `glass-isc-dhcp`

**Jared Hanson (jaredhanson@gmail.com, http://jaredhanson.net)**

https://github.com/passport/todos-express-password -- example of implementing passport.js local auth with SQLite

https://www.passportjs.org/tutorials/password/ -- tutorial for implementing passport.js local auth with SQLite

# Notes

The original `Glass` README file is preserved in this repo [here](./README.original.glass.md)
