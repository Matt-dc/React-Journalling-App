const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments')

router.get('/:articleId', CommentController.get_all_post_comments)

router.put('/update/:articleId', CommentController.add_post_comment)


module.exports = router
