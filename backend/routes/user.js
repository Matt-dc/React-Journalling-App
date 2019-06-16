const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')


router.get('/login', forwardAuthenticated, (req, res) => res.render('login'))

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'))

router.get('/dashboard', (req, res) => res.render('dashboard', {
  user: req.user
}))


router.post('/register', (req, res) => {
    
    const errors = [];

    const { name, email, password, password2 } = req.body;
    
    if( !name || !email || !password || !password2 ) {
        errors.push({ msg: 'Please fill in all fields' });
        // console.log(Object.values(name, email, password, password2))
      }
      
    if(password.length < 6){
      errors.push({ msg: 'Passwords should be 6 characters or longer for security' });
      }

    if(password !== password2) {
      errors.push({ msg: 'It looks like your passwords don\'t match' });
      } 
      
    if( errors.length > 0 ){
      res.render( 'register', {
        errors,  
        name,  
        email,
        password,
        password2
      });
      console.log(errors)

    } else {
  
      User.findOne({ email }).then(user => {
     
         if(user) {
            errors.push({ msg: 'That email is already being used' })
            res.render('register', {
              errors,
              name,  
              email,
              password,
              password2
            });
          } else {
            const newUser = new User({
              name,
              email,
              password,
              password2
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                
                 if(err) throw err;

                  newUser.password = hash; // set the password to the generated hash

                  newUser
                  .save()
                  .then(user => {
                    console.log('User saved successfully')
                    req.flash( 'msg', 'You are now registered and can log in')
                    res.redirect('/login')
                  })  
                  .catch(err => console.log(`There was an error: ${err}`));
                })
            })
          }
        })
      }     
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {

      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: 'There was a problem logging you in' 
    })(req, res, next)
  })

  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
  


module.exports = router
