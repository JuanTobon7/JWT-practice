const express = require('express');
const passport = require('passport');

async function state(req, res, next) {
    console.log('user: ',req.user)
    if(!req.user){
        res.status(400).send('No tienes credenciales, por favor inicia sesion')
    }
    await next();  // Asegúrate de llamar a next() para continuar con la siguiente función middleware
}

async function admin(req,res,next){
    console.log("soy funcion admin",req.user.rolName)
    if(!req.user || req.user.rolName !== 'admin'){
        console.log('helloouuuu')
        res.status(200).send('chau papá no tienes permisos pa esto rey')
    }
    await next();
}

module.exports = function(passport){
    const controllerUser = require('../controller/user')
    const controllerAuth = require('../controller/auth')
    const serviceUser = require('../services/user')
    
    const router = express.Router();

    //no auth
    router.post('/registrarme',state,controllerUser.register);
    router.post('/iniciar-sesion',passport.authenticate('oauth2-client-password'), controllerAuth.singIn);    
    
    //auth
    
    router.post('/crearRoles',state,admin,controllerUser.createRol);
    
    return router
}
