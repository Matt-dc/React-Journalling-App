const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

const User = require('../models/User')


module.exports = function(passport) {

    passport.use(   // rename username & password defaults to "email"
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
           
            // query DB for email
            User.findOne({ 
                email: email 
                    })
                   .then(user => {
                
                    if(!user) {
                        console.log("email not registered")
                        return done( null, false, { message: 'That email is not registered' })        
                    }
                    
                    // now check password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else  {
                            console.log("password incorrect")
                            return done(null, false, {message: 'password or email incorrect'})
                        }
                    })
                 })
            })
       )


       passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}
