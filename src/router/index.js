const express = require('express')
module.exports = app =>{
    const {register,createRol} = require('../controller/user')
    const router = express.Router();

    router.post('/registrarme','jwtauth2.0',register);
    router.post('/crearRoles', createRol);
    return router
}