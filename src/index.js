'use strict'
require('dotenv').config()
require("babel-register")

const server = require('./server').default
const store = require('./store').default
const PORT = process.env.APP_PORT

server({ 
    store
}).run(PORT)