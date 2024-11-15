const passport = require('passport')
const strategyAuth2_0 = require('passport-oauth2-client-password')
const customPassport = require('passport-custom')
passport.use(new strategyAuth2_0(function(cliendID,clientSecret,done){
    try{        
        if(cliendID !== process.env.SCR_CLIENT || clientSecret !== process.env.ID_SSR_CLIENT){
            //falta middlewares para manejar errores
            const error = 'Cliente Incorrecto'
            throw error
        }
        const client = {id: process.env.ID_SSR_CLIENT, secret: process.env.SCR_CLIENT}
        done(null,client)
    }catch(error){
        done(error)
    }    
}))

// passport.use('refreshToken', new customPassport(async function(req,done){
//     try{
//         if(req.body.grant_type === 'refresh_token' && req.body.refresh_token){
//             //const data = await
//             if(!data){
//                 throw new Error('informacion no encontrada')
//             }
//             done(null,{
//                 userId: data.userId,
//                 cliendId: data.cliendId
//             })
//         }else{
//             const error = new Error('No compatible con refresh token')
//             throw error
//         }
//     }catch(err){
//         console.log('el error es' , err)
//         done(err)
//     }
// }))

module.exports = passport