# Fiberglass

A modification of Chris Miles' (chris.miles.e@gmail.com) Glass (glass-isc-dhcp) web UI for ISC DHCP that includes user authentication.

# Overview

- Local user auth
- Passport.js and SQLite (DB in app directory)
- Create users with included script
- Sessions stored in local SQLite DB
- Routes guarded against non-authenticated users

# Getting started

To install and use `Fiberglass`:

**1. Follow the normal install instructions and process outlined in the local [README](./README.md#installation)**

**2. Install package `sqlite3` on the local system: `apt install sqlite3`**

**3. Create a file named `.env` at the root of this directory (the application directory)**

- add the following entry in the file `SESSION_COOKIE_SECRET=`
- add a session cookie secret after the equals sign; it can/should be any randomly generated long string, 20 or more characters recommended.
