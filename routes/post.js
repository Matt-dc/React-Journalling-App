const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js')

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// individual post page accessed through link
router.get('/posts/:id', (req, res) => {
  const id = req.params.id
    Post.findById(id)
    .then(post => {
      res.send(post)
        }
      )
    })


//new post form
router.get('/newpost', ensureAuthenticated, async (req, res) => res.render('newpost'))

//use req.user.id in the future
// add new post to database
router.post('/newpost', (req, res, next) => {
    const newPost = new Post ({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
    newPost.save(err => {
      if(err) {
        console.log(err)
        return next(err)
      } else {
        console.log('post created!');
        res.json({newPost})
      }
    }
  )
})


// edit post - values appear in form
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
    const post = Post.findById(id)
    .exec()
    .then(post =>
      res.render('editpost',{
        post
    }))
})

// save edited post
router.post('/posts/edit/:id', (req, res, next) => {
    var post = {}
      post.title = req.body.title,
      post.description = req.body.description,
      post.author = req.body.author,
      post.content = req.body.content

      let query = { _id: req.params.id }

    Post.update(query, post, function(err) {
      if(err) {
        console.log(err)
        return next(err)
      } else {
        console.log('post updated!');
        res.redirect('/');
      }
    }
  )
})

router.post('/:id', (req, res) => {

    Post.remove(id, function(err){
      console.log(err);
      res.redirect('/')
    })
})


module.exports = router
