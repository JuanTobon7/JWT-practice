const pasport = require('passport')
const strategyAuth2_0 = require('passport-oauth2-client-password')
pasport.use(new strategyAuth2_0(async function(){
    const clientId = 'E_commerce_pry'
    const clientSecret = 'Sistemas_E_commerce_49374940'
    
}))