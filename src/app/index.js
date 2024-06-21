require('dotenv').config();
const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./passport')

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.use(expressSession({
  secret: process.env.SSR_CLIENT, // Un secreto para firmar la sesión cookie, reemplázalo con una variable de entorno o cadena
    resave: false, // No guardar la sesión si no se modificó
    saveUninitialized: false, // No crear sesión hasta que algo se almacene
    cookie: {      
      httpOnly: true // Evitar que la cookie sea accesible por JavaScript del lado del cliente
    }
  }));
  
app.use(require('./jwt'))
app.use(passport.initialize())
app.use(passport.session())

const router = require('../router')(passport)
app.use('/api', router);

// Exportar la aplicación
module.exports = app