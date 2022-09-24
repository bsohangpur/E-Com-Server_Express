const mongodb = require('mongoose');

const BlogSchema = new mongodb.Schema({
    title: {
        type: String
    },
    creater: {
        type: String
    },
    content: {
        type: String
    },
    comments: [{
        name: { type: String },
        email: { type: String },
        subject: { type: String },
        description: { type: String },
        time: { type: Date, default: Date.now }
        
    }],
    time: { type: Date, default: Date.now },
    categories: [{ type: String }],
    tags: [{ type: String }],
    image: [{ type: String }],
    imageAlt: [{ type: String }]
})

module.exports = new mongodb.model('BlogData', BlogSchema);