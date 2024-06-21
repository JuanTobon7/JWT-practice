const express = require('express');

function log(req, res, next) {
    console.log('lalala1')

    next()
}
 
module.exports = function(passport){
    const controllerUser = require('../controller/user')
    const controllerAuth = require('../controller/auth')
    const serviceUser = require('../services/user')
    
    const router = express.Router();

    router.post('/registrarme',controllerUser.register);
    router.post('/crearRoles',controllerUser.createRol);
    router.post('/iniciar-sesion', log, passport.authenticate('oauth2-client-password'), controllerAuth.singIn);

    return router
}