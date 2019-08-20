const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    articleId: String,
    comments: [
        {
            commentId: String,
            avatarImage: String,
            userId: String,
            username: String,
            comment: String,
            date: String,
            commentLikes: Array,
            replies: [
                {
                username: String,
                avatarImage: String,
                userId: String,
                commentId: String,
                replyId: String,
                replyTo: String,
                reply: String,
                date: String,
                commentLikes: Array
            }]
        }
    ],
    closed: Boolean,
})


const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment