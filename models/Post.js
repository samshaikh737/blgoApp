const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: false
    },

}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);
module.exports = Post;