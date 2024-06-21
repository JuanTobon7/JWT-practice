const jwt = require('jwt-simple')
const user = require('../services/user')

module.exports = async function (req,res,next){
    let token
    console.log('ingresamos a token')
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Beares'){
        token = req.headers.authorization.split(' ')[1]        
    }else{
        console.log('no lo hallo: ',req.headers,' seguimos ' , req.headers.cookie)        
    }
    if(token){
        try{
            const payload = jwt.decode(token,process.env.JWT_SECRET)
        
            console.log('tratamos decodificar')

            req.payload = payload;
            req.token = token;
            const dataUser = await user.getUser(payload.idsr);
            if(!dataUser){
                res.status(400).send('token erroneo')
            }{
                req.user = dataUser;
            }
        }catch(err){
            console.log(err);
            console.log('error verificando token')
        }
    }
    await next();
}