[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![fiberglass logo](./public/images/fiberglass_logo4_with_text_transparent1.png)

`FiberGlass` is a fork of Chris Miles' (chris.miles.e@gmail.com) Glass (glass-isc-dhcp) web UI for ISC DHCP that includes user authentication, user group authorization, additional configuration options and changes, and more.

# Features

See [the original README](./README.original.glass.md#features) for a full list of the original features of Glass.

FiberGlass adds the following features:

- User authentication (Passport.js and local SQLite): users must log in to use the app -- _Note: this replaces the original Glass auth system_
- RBAC: give users different levels of access based on groups
- Allow editing of more than one config file: for example, if you've broken out your IPv4 and IPv6 DHCP config files and are using them as _includes_ in your main `dhcp.conf`
- Adds ability to control more settings through the admin UI in the application
- Minor style and theme changes
- IPv6 support

# Installation

Only Debian-based distros are currently supported/tested/used. FiberGlass _may_ work on other distros, but we have not tried, and the instructions here only cover Debian-based systems.

_NOTE: some of these instructions are copied from the [original README](./README.original.glass.md#installation)._

## Install NodeJS (If not installed)

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Install `isc-dhcp-server`

Make sure the DHCP server is installed

`apt install isc-dhcp-server`

## Install `sqlite3` (optional)

You may want to install `sqlite3` on the system to have a way of managing the user and session databases outside the application. These databases are SQLite databases located in the application directory under `.db`.

`apt install sqlite3`

## Install FiberGlass (as root)

```
cd /opt
git clone https://github.com/mathewbishop/glass-isc-dhcp
cd glass-isc-dhcp
mkdir logs
chmod u+x ./bin/ -R
chmod u+x *.sh

sudo npm install
sudo npm install forever -g
```

## Create the .env file and session secret

- Create a file named `.env` at the root of this directory (the application directory)
- add the following entry in the file `SESSION_COOKIE_SECRET=`
- add a session cookie secret after the equals sign; it can/should be any randomly generated long string, 20 or more characters recommended.

## Create your `glass_config.json` file

`glass_config.json` is used to persist app settings and application config changes you make through the admin UI

Inside the `config` directory is a file named `glass_config.example.json` with a default config. Copy this file and rename it to `glass_config.json` for use in the app.

`cp config/glass_config.example.json config/glass_config.json`

## Start the app

`sudo npm start`

- For Debian this is all that is needed and FiberGlass should start immediately, you can browse via http://server-ip:3000
- For Ubuntu users (or any system running `Apparmor`) - you will have additional Apparmor config to add
- **Recommended** to iptables port 3000 to close off FiberGlass if you are facing the public on your server
- **Recommended** to keep FiberGlass up through reboots, see [Glass Process Keepalive](#glass-process-keepalive) _or create a `systemd` service for FiberGlass_

## Apparmor

- Ubuntu uses AppArmor by default - you will most likely run into file access issues without exemptions

```
sed -i '/\/etc\/dhcp\/\*\*/a\ \ \/var\/lib\/dhcp\/\*\* lrw,' /etc/apparmor.d/usr.sbin.dhcpd
sed -i '/\/etc\/dhcp\/\*\*/a\ \ \/opt\/glass-isc-dhcp\/\*\* lrw,' /etc/apparmor.d/usr.sbin.dhcpd
service apparmor restart
```

## Glass Configuration

- Glass configuration is stored in **./config/glass_config.json**
- All of these settings can be edited in both Glass Settings and Glass Alerts within the Web Interface, if you have custom file locations you will need to edit this config file before starting

# Attribution/Credit

**Chris Miles' (chris.miles.e@gmail.com)**

Author of original [glass-isc-dhcp](https://github.com/Akkadius/glass-isc-dhcp)

**AdminBSB UI**

[AdminBSB UI](https://github.com/gurayyarar/AdminBSBMaterialDesign)

**Jared Hanson (jaredhanson@gmail.com, http://jaredhanson.net)**

https://github.com/passport/todos-express-password -- example of implementing passport.js local auth with SQLite

https://www.passportjs.org/tutorials/password/ -- tutorial for implementing passport.js local auth with SQLite

# Notes

The original `Glass` README file is preserved in this repo [here](./README.original.glass.md)
