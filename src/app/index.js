require('dotenv').config({ path: 'env_sample.env' });
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./passport')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const router = require('../router')(app)
app.use('/api', router);

app.use(require('./jwt'))
app.use(passport.initialize())
app.use(passport.session())

// Exportar la aplicación
module.exports = app