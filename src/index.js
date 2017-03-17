'use strict'
require("babel-register")

const server = require('./server')
const PORT = 3000

server.default.run(PORT)