const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const router = require('../router')(app)
app.use('/api', router);
app.use(passport.initialize())

// Exportar la aplicación
module.exports = app