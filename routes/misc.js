const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js')

const User = require('../models/User.js')

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

router.get('/', async (req, res) => {
  const posts = await Post.find({})
      res.send(posts)
    })



router.get('/dashboard', ensureAuthenticated, (req, res) => {

  Post.find({ author: req.user.id })
    
         .then(userPosts => {
          res.render('dashboard', {
            user: req.user,
            userPosts
        }
      )
         })

})

router.get('/success', (req, res) => res.render('success'))





module.exports = router
