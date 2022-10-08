const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    productId: [{ type: String, require: true }],
    title: [{ type: String, require: true }],
    price: [{ type: Number, require: true }],
    quntaty: [{ type: Number, require: true }],
    total: { type: Number, require: true },
    name: {
        firstName: { type: String },
        lastName: { type: String }
    },
    phone: { type: Number, min: 1111111111, max: 9999999999 },
    email: { type: String, minLength: 5 },
    address: {
        streetAddress: { type: String },
        apartment: { type: String },
        country: { type: String },
        state: { type: String },
        zipCode: { type: Number, min: 111111, max: 999999 }
    },
    comment: { type: String },
    orderNo:{ type: Number, require: true },
    orderStatus:{type: String, default: pending}
})

module.exports = new mongoose.model('OrderData', OrderSchema);