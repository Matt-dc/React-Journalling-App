const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

        username: { type: String },
        image: String,
        email: { type: String, required: true },
        confirmed: { type: Boolean, default: false },
        password: { type: String },
        topics: Array,
        likes: Array,
        saved_articles: Array,
        reading_history: Array,
        following: Array,
        pro: Boolean,
        joined: String
        
})

const User = mongoose.model('User', UserSchema)

module.exports = User