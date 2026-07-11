const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: Schema.Types.ObjectId
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel;