'use strict'
require('dotenv').config()
require("babel-register")

const server = require('./server')
const PORT = process.env.APP_PORT

server.default.run(PORT)