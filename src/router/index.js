const express = require('express')
module.exports = app =>{
    const controllerUser = require('../controller/user')
    const router = express.Router();

    router.post('/registrarme',controllerUser.register);
    router.post('/crearRoles',controllerUser.createRol);

    return router
}