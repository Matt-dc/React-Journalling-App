const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js')

router.get('/', async (req, res) => {
  const posts = await Post.find({})
      res.render('index', {
        posts
    })
})

router.get('/success', (req, res) => res.render('success'))

module.exports = router
