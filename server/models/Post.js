const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title : { type: String },
    image : String,
    author : String,
    authorId : String,
    authorAvatar: String,
    tagline: String,
    postLikes: Array,
    views: Array,
    comments: Number,
    topic : String,
    tags : Array,
    edit_log : Array,
    content : String,
    date : String,
    createdAt: {type: Date, default: Date.now}
})


const Post = mongoose.model('Post', PostSchema);

module.exports = Post