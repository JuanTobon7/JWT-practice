require('dotenv').config();
const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./passport')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const router = require('../router')(app)

app.use(require('./jwt'))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router)

// Exportar la aplicación
module.exports = app