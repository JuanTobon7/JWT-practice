const passport = require('passport')
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
const user = require('../services/user')
const customPassport = require('passport-custom')

/**
 * @param {String} clientId Credienciales del cliente
 * @param {String} clientSecret secreto del cliente
 * @param {function} done Callback de la operacion
 */
passport.use(new ClientPasswordStrategy(
  (client_id, client_secret, done) => {
    try{      
      if(client_id!==process.env.CLIENT_ID && client_secret!==process.env.SSR_CLIENT){
        done(null,false)
      }
      const client ={client_id: client_id, client_secret: client_secret}
      done(null,client)
    }catch(err){      
      console.log(err);
      done(err)
    }
    console.log("terminado passport")
  }
));
console.log('despues de')


passport.serializeUser((user, done) => {
    done(null, user.client_id);
  });
  
passport.deserializeUser(async (id, done) => {
  const user = await user.findById(id);
  if(user == 'id equivocado'){
    done(user.error);
  }
  done(null, user);
});

module.exports = passport