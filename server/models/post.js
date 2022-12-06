import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);

export default Post;