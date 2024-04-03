const jwt = require('jwt-simple');
const userService = require('../services/user');
const moment = require('moment')

exports.singIn =  async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password ){
        const error = new Error('Datos faltantes')
        res.status(400).send(error);
    }
    const normalPassword = Buffer.from(password, 'base64').toString('ascii')
    const dataUser = await userService.singIn(email,normalPassword)
    if(dataUser === 'Ups contraseña incorrecta'){res.status(400).send(dataUser)}
    const duration = 60 * 60 * 4;
    const payload = {
        tc: moment.format('X'),
        tex: moment.add(duration,'second').format('X'),
        idsr: dataUser.id,
        rlNme: dataUser.rolName,
        nmUsr: dataUser.name,
        ssr: process.env.SSR_CLIENT
    }
    const token = jwt.encode(payload,process.env.JWT_SECRET,'HS256');
    req.header = {acces_token: token,token_type: 'Beares' ,expires_in: duration}
}