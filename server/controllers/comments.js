const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.get_all_post_comments = (req, res) => {

    const { articleId } = req.params;

    Comment.findOne({ articleId: articleId }) 
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
}


exports.add_post_comment = (req, res) => {

    const { articleId } = req.params; 

    const updatedComments = req.body

    if(updatedComments.comments.length !== 0) {
        let comments = updatedComments.comments.map(comment => {
            return comment.replies.length + 1
        })
    
        let totalComments = comments.reduce((a, b) => a + b)
    
        Post.findById(articleId)
        .then(post => {
            if(post) {
    
                post.comments = totalComments
    
                Post.findByIdAndUpdate({ _id: articleId }, post, { new: true }, (err, doc) => {
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
    } else {
        Post.findById(articleId)
        .then(post => {
            if(post) {
    
                post.comments = 0
    
                Post.findByIdAndUpdate({ _id: articleId }, post, { new: true }, (err, doc) => {
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
    }
    Comment.findOneAndUpdate({articleId: articleId }, updatedComments, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, doc) => {
      
        if(err){
            res.send(err)
        } else {
            res.send(doc)
        }
    })

    }

                            


