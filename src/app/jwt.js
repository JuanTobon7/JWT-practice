const jwt = require('jwt-simple')
const COOKIE_KEY = process.env.COOKIE_KEY

module.exports = async function (req,next){
    let token
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Beares'){
        token = req.headers.authorization.split(' ')[1]        
    }else if (req.cookies.get(COOKIE_KEY)){
        token = req.cookies.get(COOKIE_KEY)
    }
    if(token){
        try{
            const payload = jwt.decode(token,process.env.JWT_SECRET)
            //const user = await falta crear usuario y definir como sera identificado en su token
            /*if(!user){
                req.state = {
                    ...user
                }
            }*/
        }catch(err){
            console.log(err);
            console.log('error verificando token')
        }
    }
    await next();
}