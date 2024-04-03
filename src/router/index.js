const express = require('express');
const passport = require('../app/passport')

module.exports = function(){
    const controllerUser = require('../controller/user')
    const controllerAuth = require('../controller/auth')
    
    const router = express.Router();

    router.post('/registrarme',controllerUser.register);
    router.post('/crearRoles',controllerUser.createRol);
    router.post('/iniciar-sesion',passport.authenticate(['oauth2-client-password'], { session: false }),controllerAuth.singIn)

    return router
}