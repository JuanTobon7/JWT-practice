const jwt = require('jwt-simple');
const userService = require('../services/user');
const moment = require('moment')

exports.singIn =  async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password ){
            const error = new Error('Datos faltantes')
            res.status(400).send(error);
        }
        //const normalPassword = Buffer.from(password, 'base64').toString('ascii')
        const dataUser = await userService.singIn(email,password)    
        if(dataUser.err){console.log('error aquiiii'); res.status(400).send(dataUser.message)}
        const duration = 60 * 60 * 4;
        const payload = {
            tc: moment().format('X'),
            tex: moment().add(duration, 'seconds').format('X'),
            idsr: dataUser.id,
            rlNme: dataUser.rolName,
            nmUsr: dataUser.name,
            ssr: process.env.SSR_CLIENT
        };
        const userId = payload.idsr;
        const token = jwt.encode(payload,process.env.JWT_SECRET,'HS256');        
        req.header = {acces_token: token,token_type: 'Bearer' ,expires_in: duration,userId}
        console.log('header: \n',req.header)
    }catch(err){
        console.log(err);
    }finally{        
        res.status(200).send('terminado rey, gracias')
    }
}