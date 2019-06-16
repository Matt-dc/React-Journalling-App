const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js')


// individual post page accessed through link
router.get('/posts/:id', (req, res) => {
  const id = req.params.id
    const post = Post.findById(id)
    .exec()
    .then(post =>
      res.render('post',{
        post
    }))
})


//new post form
router.get('/newpost', async (req, res) => res.render('newpost'))


// add new post to database
router.post('/newpost', (req, res, next) => {
    var newPost = new Post ()

    newPost.title = req.body.title,
    newPost.description = req.body.description,
    newPost.author = req.body.author,
    newPost.content = req.body.content

    newPost.save(err => {
      if(err) {
        console.log(err)
        return next(err)
      } else {
        console.log('post created!');
        res.redirect('/success');
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
