const mongodb = require('mongoose');

const ProductSchema = new mongodb.Schema({
    title: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priceCost: {
        type: Number,
        required: true
    },
    priceSell: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    review: [{
        rating: { type: Number },
        detail: { type: String },
        time: { type: Date, default: Date.now }
    }],
    image: [{ type: String }],
    imageAlt: [{ type: String }],
    category: [{ type: String }],
    color: [{ type: String }],
    size: [{ type: String }],
    createdOn: { type: Date, default: Date.now }
})

module.exports = new mongodb.model('ProductData', ProductSchema);