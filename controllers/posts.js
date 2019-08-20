const Post = require('../models/Post.js')

exports.get_all_posts = (req, res) => {

    Post.find({}).sort({ createdAt: 'desc'})
    
    .then(posts => {
        posts.map(post => {
            return post.postLikes = post.postLikes.length
        })
        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}

exports.get_single_post = (req, res) => {

    const id = req.params.id;

    Post.findById(id)
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_posts_on_topic = (req, res) => {

    const topic = req.params.topic;

    Post.find({ topic: topic })
    .then(posts => {
        posts.map(posts => {
            return posts.postLikes = posts.postLikes.length
        })
        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_single_user_post = (req, res) => {

    const { articleId } = req.params

    Post.findById(articleId)
    .then(post => {
        if(post) {
            res.send(post)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}




exports.update_user_post_image = (req,res) => {

    const { articleId } = req.params

    Post.findById(articleId)
    .then(post => {
        post.image = req.file.path
        Post.findByIdAndUpdate({ _id: articleId }, post, { new: true }, (err, doc) => {
            if(err) res.send(err)
        })
        res.send(post)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.update_single_user_post_get_all = (req, res) => {

    const { id } = req.params
    const { articleId, title, tagline, topic, content } = req.body

    Post.findById(articleId)
    .then(post => {
        if(post) {
            post.title = title
            post.tagline = tagline
            post.topic = topic
            post.content = content

            Post.findByIdAndUpdate({_id: articleId}, post, { new: true }, (err, doc) => {
                if(err) {
                    res.send(err)
                } 
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
    .then(() => {
        Post.find({ authorId: id })
        .then(posts => {
            if(posts) {
                res.send(posts)
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.update_single_user_post_get_one = (req, res) => {

    const { articleId, title, tagline, topic, content } = req.body

    Post.findById(articleId)
    .then(post => {
        if(post) {
            post.title = title
            post.tagline = tagline
            post.topic = topic
            post.content = content

            Post.findByIdAndUpdate({_id: articleId}, post, { new: true }, (err, doc) => {
                if(err) {
                    res.send(err)
                } else {
                    res.send(doc)
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.delete_single_user_post = (req, res) => {

    const { id } = req.params // userId
    const { articleId } = req.body

    Post.findByIdAndDelete({ _id: articleId }, (err, doc) => {
        if(err) res.send(err)
    })
    .then(() => {
        Post.find({ authorId: id })
        .then(posts => {
            if(posts) {
                res.send(posts)
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_user_posts = (req, res) => {

    const { id } = req.params
    // ELSE - ERROR HANDLING!!!
    Post.find({ authorId: id }).sort({ createdAt: 'desc'})
    .then(posts => {

            posts.map(post => {
            return post.postLikes = post.postLikes.length
        })

        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_personalized_posts = (req, res) => {

    const topics = JSON.parse(req.params.topics);

    Post.find({topic: {$in: topics}}).sort({ createdAt: 'desc'})
    .then(posts => { 

        posts.map(post => {
            return post.postLikes = post.postLikes.length
        })
        res.send(posts)   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_popular_posts = (req, res) => {
    Post.find({}).sort({likes: 'desc'}).limit(20)
    .then(posts => {

        posts.map(post => {
            return post.postLikes = post.postLikes.length
        })
        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}


exports.get_posts_by_followed_users = (req, res) => {

    const parsedUsers = JSON.parse(req.params.users) 

    Post.find({_authorId: {$in: parsedUsers}})
    .then(posts => {
        if(posts) {
            res.send(posts)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}



exports.set_post_image = (req, res) => {

    const { id } = req.params
    const updatedImg = req.body
    updatedImg.image = req.file.path

    User.findByIdAndUpdate({ _id: id }, updatedImg, { new: true }, (err, doc) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send(doc);
        }
    })
}


exports.create_new_post = (req, res) => {

    if(!req.body.articleId) {

        const post = new Post();
        post.image = req.file.path
        post.save((err, post) => {

            res.send(post)
        })
    } else {

        const { articleId } = req.body
        Post.findById(articleId) 
        .then(post => {
    
            if(post){
                post.image = req.file.path
                res.send(post)
            } 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        })
    }  
}


exports.update_new_post = (req, res) => {

    const { articleId } = req.params

    const updatedPost = req.body

    updatedPost.image = req.file.path

    Post.findByIdAndUpdate({ _id: articleId }, updatedPost, { new: true }, (err, doc) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send(doc);
        }
    })

}


exports.update_post_likes = (req, res) => {

    const { articleId } = req.params
    const { userId} = req.body

    Post.findById(articleId)
    .then(post => {
        if(post) {
                if(! 'postLikes' in post) {
                    post.postLikes = []
                    post.postLikes = [ ... post.postLikes, userId ]
            
                } else if (post.postLikes.includes(userId)) {
                    post.postLikes = post.postLikes.filter(user => {
                        return user != userId
                    })

                } else {
                    post.postLikes = [ ...post.postLikes, userId ] 
            
                }
            }

        Post.findByIdAndUpdate({ _id: articleId} , post, { new: true }, (err, doc)  => {
            if(err) {
                return res.send(err);
            } else {
                return res.send(doc);
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    })
}


exports.update_post_views = (req, res) => {

    const { articleId } = req.params
    const { userId } = req.body

    Post.findById(articleId)
    .then(post => {
        if(post) {
            if(! 'views' in post || post.views == null) {
                post.views = []
                post.views = [ ...post.views, userId ]
            } else if (! post.views.includes(userId)) {
                post.views = [ ...post.views, userId ] 
            }
            Post.findByIdAndUpdate({ _id: articleId}, post, { new: true }, (err, doc) => {
                if(err) res.send(err)
                if(doc) res.send(doc)
            })         
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    })
}

