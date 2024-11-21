const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
